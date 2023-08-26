
import React, { useRef ,useState} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple,red,green,orange,deepOrange,deepPurple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

const EnterName = () => {
    const [loading, setLoading] = useState(false);
    function handleClick() {
      setLoading(true);
    }
    const textRef=useRef()

    const [textError,setTextError]=useState(false)

    const theme = createTheme({
        palette: {
          primary: deepPurple,
          secondary: orange,
        },
      });
    
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
    <ThemeProvider  theme={theme}>
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
    </ThemeProvider>
  )
}

export default EnterName