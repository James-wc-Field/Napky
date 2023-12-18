import React from "react";

import { Input } from "@nextui-org/input"
import { Link } from "@nextui-org/link"
import { Button } from "@nextui-org/button"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"

import Copyright from "../../components/Copyright";

export default function Page() {
  return (
    <div className="flex h-screen justify-center items-center">
			<Card className="max-w-full w-[340px] h-fit">
        <CardHeader className="flex justify-center">
          <p className="text-xl font-bold">Reset Password</p>
        </CardHeader>
				<CardBody>
          <form className="flex flex-col gap-4">
            <p className="text-sm text-center mx-4">
              Enter your email address and we will send you a link to reset your password.
            </p>
            <Input
              isRequired
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <Button
              fullWidth
              color="primary"
            >
              Email me
            </Button>
            <Link href="/login" className="justify-center text-sm">
              Back to Login
            </Link>
          </form>
				</CardBody>
				<CardFooter className="flex flex-col">
					<Copyright />
				</CardFooter>
			</Card>

    </div>
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
    //       <QuestionMark />
    //     </Avatar>
    //     <Typography variant="h5">
    //       Reset Password
    //     </Typography>
    //     <Box sx={{ mt: 3, width: '100%', alignItems: 'center' }}>
    //       <Typography variant="body2">
    //         Enter your email address and we will send you a link to reset your password.
    //       </Typography>
    //     </Box>
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
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         sx={{ mt: 3, mb: 2 }}
    //       >
    //         Email me
    //       </Button>

    //     <Grid container justifyContent="center">
    //       <Grid item>
    //       <Link href="/signin">
    //         Back to Login
    //       </Link>
    //       </Grid>
    //     </Grid>
    //     </Box>
    //   </Box>
    // </Container>
  );
}