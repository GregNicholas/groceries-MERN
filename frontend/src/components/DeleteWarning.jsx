import ModalContainer from "./ModalContainer"

const DeleteWarning = ({closeModal, onClick}) => {
  return (
    <ModalContainer closeModal={closeModal}>
        <h2>Delete All Items?</h2>
        <p>This cannot be undone</p>
        <div className="confirm-select">
          <button className="btn-action confirm-delete" onClick={onClick}>Delete All</button>
          <button className="btn-action cancel-delete" onClick={closeModal}>Cancel</button>
        </div>
    </ModalContainer>
  )
}
export default DeleteWarning