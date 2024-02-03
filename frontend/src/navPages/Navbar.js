import React, { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Offcanva from '../Pages/Offcanva';
import { clearToken } from '../redux/slice/authenticationSlice';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import { getApiData } from '../CommonComponents/ApiFunctions';
import { setUser } from '../redux/slice/userSlice';
import { toast } from 'react-toastify';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ResetRedux from '../CommonComponents/ResetRedux';
const NavBar = () => {
  const {isAuthenticated} = useSelector((state) => state?.authentication)
  const {user, quantity} = useSelector((state) => state?.user)
  const [show, setShow] = useState(false);
  const  {handleReduxReset} = ResetRedux()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
const navigate = useNavigate()
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 1,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
  const handleLogout = () => {
    // Dispatch the clearToken action to remove the token from the Redux store
    handleReduxReset()
    setAnchorEl(null);
    dispatch(clearToken());
    navigate('/')
    localStorage.removeItem('jwtToken');
  };
  const handleProfileRedirect = ()=>{
    setAnchorEl(null);
    navigate('/profile')
  }
  useEffect(()=>{
    const getLoggedUserData = async()=>{
      const url = `auth/loggedUserData`
      try {
        const res = await getApiData(url)
        if(res.status === 200){
          const userDetails = res.data?.data
          dispatch(setUser(userDetails))
        }else{
          toast.error(res.response.data.msg)
        }
      } catch (error) {
        console.log("error", error)
        toast.error(error.response.data.msg)
      }
 
    }
    if(isAuthenticated){
      getLoggedUserData()
    }
  },[isAuthenticated])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCartClick = () =>{
    if(!isAuthenticated){
      toast.error("Please login!")
    }
  setShow(isAuthenticated)
  }
  return (
    <>
    <Navbar bg="white" className='shadow-sm static py-3'  expand="lg">
    <Container>
        <LinkContainer to ="/" className='text-decoration-none font-extrabold'>
      <Navbar.Brand >Restaurant</Navbar.Brand>
        </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <LinkContainer className='font-bold text-decoration-none italic' to="/productsByCategory" state={{ category: 'cake'}}>
          <Nav.Link >Cake</Nav.Link>
        </LinkContainer>

            <LinkContainer className='font-bold text-decoration-none italic' to="/productsByCategory" state={{ category: 'pizza'}} >
          <Nav.Link >Pizza</Nav.Link>
        </LinkContainer>
            <LinkContainer className='font-bold text-decoration-none italic' to="/productsByCategory" state={{ category: 'sandwitch'}} >
          <Nav.Link >Sandwitch</Nav.Link>
        </LinkContainer>
          
            <LinkContainer className='font-bold text-decoration-none italic'  to="/productsByCategory" state={{ category: 'bread'}} >
          <Nav.Link  >Bread</Nav.Link>

            </LinkContainer>
        
        </Nav>
        <Nav>
      <div className=' flex mx-2'>
      <IconButton aria-label="cart" onClick ={handleCartClick}>
      <StyledBadge badgeContent={quantity} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
      
      </div>
         
          {/* <sapn className= "text-white rounded-full p-1 bg-red-500">21</sapn> */}
         
      <Offcanva show={show} handleClose ={()=>setShow(false)} />
      {isAuthenticated ?(
       <>
        <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' , width: '25%'}} >
       
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {/* <Avatar sx={{ width: 32, height: 32 }}>K</Avatar> */}
            <Avatar sx={{ width: 32, height: 32 }}>{user?.name?.charAt(0)?.toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileRedirect}>
          <Avatar /> Profile
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
      
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small"  />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
       </>
      ):
(
  <LinkContainer className='font-bold text-decoration-none italic' to="/login">
          <Nav.Link  ><button className='bg-purple-500 px-4 py-0 rounded text-white' onClick={handleLogout}>Login</button></Nav.Link>
            </LinkContainer>
)
      }
      
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
<hr className='m-0 blur'/>
</>
  )
}

export default NavBar