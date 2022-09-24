import ModalContainer from "./ModalContainer"

const DeleteWarning = ({closeModal, onClick}) => {
  return (
    <ModalContainer closeModal={closeModal}>
        <div>DeleteWarning</div>
        <button onClick={onClick}>Delete</button>
    </ModalContainer>
  )
}
export default DeleteWarning