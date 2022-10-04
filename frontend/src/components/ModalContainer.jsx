import { motion } from 'framer-motion'

const ModalContainer = ({children, closeModal}) => {

  return (
    <div 
        onClick={closeModal} 
        className="modal-background"
    >
        <motion.div onClick={e=>e.stopPropagation()} className="recipe-card"
          initial={{y: "50%", opacity: 0, scale: 0}}
          animate={{y: 0, opacity: 1, scale: 1}}
          transition={{ delay: 0.3 }}
          exit={{y: "50%", scale: 0}}
        >
          {children}
        </motion.div>
    </div>
  )
}
export default ModalContainer