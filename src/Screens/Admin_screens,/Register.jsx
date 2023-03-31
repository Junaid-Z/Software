import { Grid } from "@mui/material";
import SMForm from "../../components/SMForm";
import SMButton from '../../components/SMButton';
import SMInput from "../../components/SMInput";
import SMSelect from '../../components/SMSelect';
import { useState } from "react";
import { signUp, setData } from "../../Firebase/FirebaseFunctions";
import SMModal from "../../components/SMModal";

function Register() {
	function userSignup() {
		let { email, password, role, CNIC, name } = input
		setLoading(true);
		signUp({ email, password }).then((res) => {
			setData('Users', {
				email,
				password,
				role,
				CNIC,
				name
			}, res.user.uid)
			setLoading(false);
			setModalOpen({
				state: true,
				content: "",
				heading: "Signup Success",
			})
		}).catch((err) => {
			setLoading(false);
			if (err.message === 'Firebase: Error (auth/invalid-email).') {
				setModalOpen({
					state: true,
					content: "Invalid Email Provided",
					heading: "SignUp Failed",
				})
			}
			else if (err.message === 'Firebase: Error (auth/internal-error).') {
				setModalOpen({
					state: true,
					content: "Important fields missing",
					heading: "SignUp Failed",
				})
			}
			else if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
				setModalOpen({
					state: true,
					content: "Password should be at least 6 characters",
					heading: "SignUp Failed",
				})
			}
			else if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
				setModalOpen({
					state: true,
					content: "Email Already In Use",
					heading: "SignUp Failed",
				})
			}
			console.log(err.message)
		})
	}
	let [loading, setLoading] = useState(false)
	let [input, setInput] = useState({
		role: 'student',
		name: '',
		email: '',
		password: '',
		CNIC: ''
	});
	let handleInput = (e) => {
		setInput((prev) => { return { ...prev, [e.target.name]: e.target.value } })
	}
	let [modalOpen, setModalOpen] = useState({
		state: false,
		content: '',
		heading: ''
	})

	return (<>
		<div id="signupConatiner">
			<Grid container columns={{ xs: 12 }}>
				<SMForm
					button={
						<Grid item sx={{ margin: 'auto' }} xs={12} sm={6} lg={4} xl={3}>
							<SMButton
								disabled={loading}
								loading={loading}
								style={{ width: '100%' }}
								label={"Signup"}
								variant={'contained'}
								onClick={() => { userSignup() }} />
						</Grid>
					}
					list={[
						{
							comp: <SMInput
								type={'text'}
								label="Name"
								variant="outlined"
								name={'name'}
								value={input.name}
								onChange={handleInput}
								height={0}
								placeholder={"Name"}
							/>,
							mdWidth: 6,
							xsWidth: 12
						},
						{
							comp: <SMInput
								type={'email'}
								label="Email"
								value={input.email}
								variant="outlined"
								name={'email'}
								onChange={handleInput}
								height={0}
								placeholder={"Email"}
							/>,
							mdWidth: 6,
							xsWidth: 12
						},
						{
							comp: <SMInput
								type={'password'}
								label="Password"
								variant="outlined"
								value={input.password}
								name={'password'}
								onChange={handleInput}
								height={0}
								placeholder={"Password"}
							/>,
							mdWidth: 6,
							xsWidth: 12
						},
						{
							comp: <SMInput
								type={'text'}
								label="CNIC"
								variant="outlined"
								value={input.CNIC}
								name={'CNIC'}
								onChange={handleInput}
								height={0}
								placeholder={"CNIC"}
							/>,
							mdWidth: 6,
							xsWidth: 12
						},
						{
							comp: <SMSelect
								label={"Select"}
								name={'role'}
								style={{ minWidth: "150px" }}
								options={[
									{
										value: "student",
										displayName: "Student"
									},
									{
										value: "admin",
										displayName: "Admin"
									},
									{
										value: "teacher",
										displayName: "Teacher"
									},
									{
										value: "institute",
										displayName: "Institute"
									}
								]}
								value={input.role}
								onChange={handleInput}
							/>,
							mdWidth: 6,
							xsWidth: 12
						}
					]} />
			</Grid>
		</div>
		<SMModal
			open={modalOpen.state}
			handleClose={() => {
				setModalOpen({
					state: false,
					content: '',
					heading: ''
				})
			}}
			heading={<span className={`alertHeading ${modalOpen.heading !== 'Signup Success' ? 'error' : 'success'}`}>{modalOpen.heading}</span>}
			text={<span className={`alert ${modalOpen.heading !== 'Signup Success' ? 'error' : 'success'}`}>{modalOpen.content}</span>} />
	</>
	)
}
export default Register;