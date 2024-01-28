
const ErrorComponent = ({ message }) => {
    return (
        <p className="text-center text-danger fs-5">
            { message }
        </p>
    )
}

export default ErrorComponent