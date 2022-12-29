import { useState, useEffect, useContext, createContext } from 'react';
import { alpha, styled, useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Link from '../../src/Link';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router'
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBarMenu from './AppBarMenu'
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { useSession } from "next-auth/react"
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Grid, Stack } from '@mui/material';



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const MUIAppBar = styled(MuiAppBar, {
  
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const StyledToolbar = styled(AppBar)(({ theme }) => ({
  background: '#000',
  
  color: '#FFF',
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 38,
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function AppLayout(props) {
  const { data: session, status } = useSession()
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [chosenTerm, setChosenTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);


  //************************************************************** */
  //* S E T T I N G S   D R A W E R
  //************************************************************** */

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //************************************************************** */
  //* H A N D L E   S E A R C H 
  //************************************************************** */

  const handleClick = () => {
    if(isLoading === false) {
      setShowSearchResults((prev) => !prev);
    }
    if(isLoading === false) {
      setOpenSearchDialog(true);
    }
  };

  const handleSearchFilter = (event) => {
    setSearchTerm(event.target.value);
  }


  //************************************************************** */
  //* U S E   E F F E C T   I N I T
  //************************************************************** */

  useEffect(async () => {
    
  }, [])

  return (
    <>
      <MUIAppBar position="fixed" sx={{background: '#4a6c92'}}>
          <Toolbar>                            
              Next-Auth Demo
              {session && (        
              <>              
                <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  readOnly
                  placeholder="Search…"
                  inputProps={{ 'aria-label' : 'search' }}
                  onClick={(e) => handleClick(e)}
                  onChange={(e) => handleSearchFilter(e)}
                  name="search"
                  disabled={isLoading}
                  endAdornment={
                    <InputAdornment position="start">
                      {isLoading === true?
                      <CircularProgress size={20}/>
                      :
                      ''
                      }
                    </InputAdornment>
                  }
                />

                </Search>
              </>
              )}
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Link to secure page using SSR">
                <Button
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    component={Link}
                    href="/profile"
                    sx={{ mr: 4 }}
                  >
                  Secure Page With SSR 
                </Button>
              </Tooltip>
              
              <Tooltip title="Link to secure page using middleware">
                <Button
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    component={Link}
                    href="/secure/page-one"
                    sx={{ mr: 4 }}
                  >
                  Secure Page 1 - Middleware 
                </Button>
              </Tooltip>

              <Tooltip title="Link to secure page using middleware">
                <Button
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    component={Link}
                    href="/secure/page-two"
                    sx={{ mr: 4 }}
                  >
                  Secure Page 2 - Middleware 
                </Button>
              </Tooltip>
              {session && (        
                <>
               
           
               <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <AppBarMenu handleDrawerOpen={handleDrawerOpen}/>
              </Box>
              </>)
              }
              {!session && (
                  <>             
                    <Tooltip title="Sign In with Google or GitHub">
                      <Button color="inherit" 
                              variant="outlined"
                              startIcon={<AccountCircleIcon/>}
                              component={Link} 
                              
                              href="/login">
                                Sign In
                                </Button>
                    </Tooltip>
                  </>
                )}
          </Toolbar>
          </MUIAppBar>
                  
          <Box component="div"
                sx={{                  
                  p:10,
                  mr: 1,
                  mt: 4,
                  bgcolor: 'background.default',
                  color: 'text.primary',
                  justifyContent: 'center'
                }}
                
              >
                                
                <>
                  {props.mainPage}
                </>
              
            
          </Box>
            
       
    

    </>
  );
}

