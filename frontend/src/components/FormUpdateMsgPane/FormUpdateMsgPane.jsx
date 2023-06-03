import { useEffect } from 'react'
import './FormUpdateMsgPane.css'
import ShareSheet from '../ShareSheet/ShareSheet';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { TbShare2 } from 'react-icons/tb'
import { AiOutlineEye } from 'react-icons/ai'
import FormUpdateCta from '../FormUpdateCta/FormUpdateCta';

export default function FormUpdateMsgPane( {formId, restrictedForm} ) {
    const [showShareModal, setShowShareModal] = useState(false);
    
    return (
        <div className="fcp-thank-you-wrapper">
            <div className="fcp-thank-you">
                <div className="fcp-header">
                    {formId ? "You've updated your invite! Remember you can always..." : "You've created an invite! What's next you ask?"}
                </div>

                {/* {showShareModal && <Modal closeModal={closeModals} content={<ShareSheet form={form} closeModal={closeModals}/>}/>} */}
                {showShareModal && <Modal closeModal={() => { setShowShareModal(false) }} content={<ShareSheet closeModal={() => { setShowShareModal(false) }} formId={formId} />} />}

                <div className="fcp-combined-cta">
                    <FormUpdateCta
                        icon={AiOutlinePlusCircle}
                        linkText={"Add Questions"}
                        afterLink={`to your invite`}
                        path={`/forms/${formId}/questions`}
                    />

                    <FormUpdateCta
                        icon={TbShare2}
                        linkText={"Share"}
                        afterLink={`your invite link`}
                        path={""}
                        handleClick={() => { setShowShareModal(true) }}
                    />

                    {restrictedForm &&
                        <FormUpdateCta
                            icon={AiOutlinePlusCircle}
                            linkText={"Add Guests"}
                            afterLink={"to your invite"}
                            path={`/forms/${formId}/invite-list`}
                        />}

                    <FormUpdateCta
                        icon={AiOutlineEye}
                        linkText={"View Responses"}
                        afterLink={"to your invite"}
                        path={`/forms/${formId}/responses`}
                    />
                </div>
            </div>
        </div>
    )
}