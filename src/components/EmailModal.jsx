import '../scss/email_modal.scss'

const EmailModal = ({handleCloseEmailModal}) => {

    setTimeout(() => {
        handleCloseEmailModal()
    }, 4000)

    const handleCloseBtn = () => {
        handleCloseEmailModal()
    }

    return (
        <div className='modal_email'>
            <div className='modal_email_content'>
                <h2>Thank You for participating our community!</h2>
                <h3>Don't be scared, We will not spam!</h3>
                <button onClick={handleCloseBtn}>Close</button>
            </div>
        </div>
    )
}

export default EmailModal