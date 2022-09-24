const ModalContainer = ({children, closeModal}) => {

  return (
    <div 
        onClick={closeModal} 
        className="modal-background"
    >
        <div onClick={e=>e.stopPropagation()} className="recipe-card">
          {children}
        </div>
    </div>
  )
}
export default ModalContainer