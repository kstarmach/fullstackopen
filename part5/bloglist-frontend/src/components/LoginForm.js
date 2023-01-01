const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        type='text'
                        value={username}
                        name="Username"
                        id="username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        id="password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button
                    type='submit'
                    id="login-button"
                >
                login
                </button>
            </form>
        </div>
    )
}

export default LoginForm