// Borrowed (mostly) from https://github.com/mui/material-ui/blob/v5.14.18/docs/data/material/getting-started/templates/sign-up/SignUp.tsx

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Typography, Container, Box, Grid, 
  Button, Avatar, CssBaseline, TextField
} from '@mui/material';

import Link from 'next/link';

import Copyright from '@/app/components/Copyright'

export default function SignUp() {
  return (
	<Container component="main" maxWidth="xs">
	<CssBaseline />
	<Box
		sx={{
		marginTop: 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		}}
	>
		<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
		<LockOutlinedIcon />
		</Avatar>
		<Typography component="h1" variant="h5">
		Sign up
		</Typography>
		<Box component="form" noValidate sx={{ mt: 3 }}>
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
			<TextField
				autoComplete="given-name"
				name="firstName"
				required
				fullWidth
				id="firstName"
				label="First Name"
				autoFocus
			/>
			</Grid>
			<Grid item xs={12} sm={6}>
			<TextField
				required
				fullWidth
				id="lastName"
				label="Last Name"
				name="lastName"
				autoComplete="family-name"
			/>
			</Grid>
			<Grid item xs={12}>
			<TextField
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
			/>
			</Grid>
			<Grid item xs={12}>
			<TextField
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="new-password"
			/>
			</Grid>
		</Grid>
		<Button
			type="submit"
			fullWidth
			variant="contained"
			sx={{ mt: 3, mb: 2 }}
		>
			Sign Up
		</Button>
		<Grid container justifyContent="center">
			<Grid item>
			<Link href="/signin">
				Already have an account? Sign in
			</Link>
			</Grid>
		</Grid>
		</Box>
	</Box>
	<Copyright sx={{ mt: 5 }} />
	</Container>
  );
}