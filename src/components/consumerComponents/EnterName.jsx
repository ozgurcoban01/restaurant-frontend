
import React, { useRef ,useState} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';

const EnterName = () => {
  const navigate=useNavigate()
    const [loading, setLoading] = useState(false);
    function handleClick() {
      setLoading(true);
    }
    const textRef=useRef()

    const [textError,setTextError]=useState(false)


    const checkText=()=>{
        const div=textRef.current
        const innerText=div.children[1].children[0].value

            if(innerText){
            
                setTextError(false)
            }else{
         
                setTextError(true)
            }
   

    }
    const setTextCheck=()=>{
        setTextError(0)

    }
    
      
  return (
    
      <form>
      <TextField required ref={textRef} onBlur={checkText} onFocus={setTextCheck} id="outlined-basic" label="Enter Name" variant="outlined" error={textError}/>
      <Button type="submit" variant="contained"  >
        Secondary
      </Button>
      <LoadingButton
          size="small"

          onClick={handleClick}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </form>
   
  )
}

export default EnterName