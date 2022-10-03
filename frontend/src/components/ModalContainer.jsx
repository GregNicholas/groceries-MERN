import { motion, AnimatePresence } from 'framer-motion'

const ModalContainer = ({children, closeModal}) => {

  return (
    <div 
        onClick={closeModal} 
        className="modal-background"
    >
        <motion.div onClick={e=>e.stopPropagation()} className="recipe-card"
          initial={{y: "50%", opacity: 0, scale: 0.5}}
          animate={{y: 0, opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.1}}
        >
          {children}
        </motion.div>
    </div>
  )
}
export default ModalContainer