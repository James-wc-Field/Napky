export default function Page() {
  return (
		<>
      <h1>this is the signup page!!!</h1>
			<p>signup page</p>

			<form>
				<label>email</label>
				<input type="email" />
				<br />
				<label>password</label>
				<input type="password" />
				<br />
				<label>confirm password</label>
				<input type="password" />
				<input type="submit" />
			</form>
		</>
  );
}