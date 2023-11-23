export default function Page() {
	return (
		<main>
			<h1>this is the signup page!!!</h1>
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
		</main>
	);
}