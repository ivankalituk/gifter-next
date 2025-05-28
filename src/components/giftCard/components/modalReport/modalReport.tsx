import React, { ChangeEvent, FC, useState } from 'react';
import './modalReport.scss';
import { useUpdateRequest } from '@/hooks/useUpdateRequest';
import { postReport } from '@/api/report';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/interfaces/interface';



interface ModalProps {
  handleReportClose: () => void;
  modalProps: any
}

const Modal: FC<ModalProps> = ({ handleReportClose, modalProps}) => {

  // --------------
  // создать репорт
  // --------------

  const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
  const user = useTypeSelector((state) => state.user)


  const [textArea, setTextArea] = useState<string>('')

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(event.target.value)
  }

  const {mutatedFunc: createReport} = useUpdateRequest({fetchFunc: postReport})

  const handleCreateReport = () => {
    if(textArea !== ''){
      if(user.user_email !== null){
        if(user.user_blocked){
          alert('Ви в чорному списку!!?')
          handleReportClose()
        } else {
          createReport({user_id: user.user_id, gift_id: modalProps.gift_id, content: textArea})
          handleReportClose()
        }

      }
      else{
        alert('Ви не зареэстровані')
      }
    }
  }

  return (
    <div className="modalReport">
      <div className="modalReport_container">
        <div className="modalReport_content">
          <span>Відгук</span>
          <textarea placeholder="Введіть відгук" value={textArea} onChange={handleTextAreaChange}/>
          <button onClick={handleCreateReport}>Відправити відгук</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
