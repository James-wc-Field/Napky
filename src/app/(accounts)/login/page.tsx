import Link from 'next/link';

import LoginCard from '../../components/LoginCard';

export default function Page() {
  return (
    <>
      <LoginCard />
    </>
    // <Container component="main" maxWidth="xs">
    //   <CssBaseline />
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     <Typography component="h1" variant="h5">
    //       Sign in
    //     </Typography>
    //     <Box component="form" noValidate sx={{ mt: 1 }}>
    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="email"
    //         label="Email Address"
    //         name="email"
    //         autoComplete="email"
    //         autoFocus
    //       />
    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         name="password"
    //         label="Password"
    //         type="password"
    //         id="password"
    //         autoComplete="current-password"
    //       />
    //       <FormControlLabel
    //         control={<Checkbox value="remember" color="primary" />}
    //         label="Remember me"
    //       />
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         sx={{ mt: 3, mb: 2 }}
    //       >
    //         Sign In
    //       </Button>
    //       <Grid container>
    //         <Grid item xs>
    //           <Link href="/forgot">
    //             Forgot password?
    //           </Link>
    //         </Grid>
    //         <Grid item>
    //           <Link href="/signup">
    //             {"Don't have an account? Sign Up"}
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Box>
    // </Container>
  );
}