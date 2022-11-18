import { FunctionComponent,useState,FormEvent,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { GoSearch } from 'react-icons/go'
import Card from 'react-bootstrap/Card';
import {Setting} from '@/src/types/settings'
import useSettings from '@/src/hooks/useSettings'
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast'


interface settingPayload {
  data_json_str: string;
}

const SettingsPage: FunctionComponent = () => {

const queryClient = useQueryClient();
const {data:{total,fetched,setting:s}={total:0,fetched:0,setting:null}} = useSettings();
const [setting, setSetting] = useState<Setting>();
const [enableApplyKeywordsFilters, setEnableApplyKeywordsFilters] = useState<boolean>(false); 

useEffect(()=>{
    if(s){
          setSetting(s);
          setEnableApplyKeywordsFilters(s.ApplyKeywordsFilters)
    }
  },[s])

 const handleSaveSettingsSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const form = ev.currentTarget;
    const data_json:Setting = {
      keywords:form.keywords.value,
      ApplyKeywordsFilters:enableApplyKeywordsFilters
    };
    

    const payload: settingPayload = {
        data_json_str: JSON.stringify(data_json),
      };
    execSaveSettings(payload)
  };

 const {
    mutate: execSaveSettings,
    error: SaveSettingsError,
    isLoading: isSaveSettingsLoading,
    isError: isSaveSettingsError,
    isSuccess: isSaveSettingsSuccess,
  } = useMutation(
    async (payload:settingPayload): Promise<Setting | null >   => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-settings?data_json_str=${payload.data_json_str}`, {
             method: 'POST',
             mode: 'cors',
            })

       if(!res.ok)
           toast.error(`An error occurred saving bidbot setting`); 
       else
          toast.success('Bidbot setting saved')
      return null;
    },
    {
      onMutate: async () => {
          const cacheKey = ['SETTINGS', `settings`];
          const snapshot = queryClient.getQueryData(cacheKey);
          return { cacheKey, snapshot };
      },
      onSettled: (_comment, error, _variables, context) => {
        if (context) {
          const { cacheKey: ck, snapshot } = context;
          if (error && ck) {
            queryClient.setQueryData(ck, snapshot);
          }
          if (context){
             queryClient.invalidateQueries(ck);
             queryClient.invalidateQueries(['BIDS','mybids'])
             }
        }
      },
    },
  );

 

  return <Container className=''> 
                    <Form className="w-100" onSubmit={handleSaveSettingsSubmit}>

            <Card className='w-100 rounded rounded-5'>
              <Card.Body>
                <Card.Title>Keywords for filters. Write these separated by commas ( , )</Card.Title>
                <section>
                    <Form.Group className="mb-4" controlId="keywords">
                      <Form.Control className='rounded rounded-4' as="textarea" rows={8} defaultValue={setting?.keywords || ""}/>
                    </Form.Group>
                       <div className='d-flex justify-content-end'>
                          <Form.Check 
                                checked={enableApplyKeywordsFilters}
                                type="switch"
                                id="custom-switch"
                                label="Apply keywords filters"
                                onChange={(e) => {
                                  setEnableApplyKeywordsFilters(e.currentTarget.checked);
                                }}
                              />
                        </div>
                </section>
              </Card.Body>
            </Card> 
             <div className='d-flex justify-content-end mt-4'>
               <Button type="submit" className='mt-2 rounded rounded-5' disabled={isSaveSettingsLoading}><span className='px-4'>Save</span></Button>
             </div> 
                  </Form>
</Container> 
}

export default SettingsPage;