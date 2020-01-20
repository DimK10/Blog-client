import React, { useState, useEffect } from 'react';
import Menu from '../core/Menu';
import PreviewPost from './PreviewPost';
import Modal from 'react-modal';
import ImageUploader from 'react-images-upload';
import { useForm } from 'react-hook-form'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-theme-lark';

const CreatePost = (props) => {
    
    const [pictures, setPictures] = useState([]);
    const [titleForPreview, setTitleForPreview] = useState('');
    const [descForPreview, setDescForPreview] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => { console.log(data) }

    const onDrop = (picture) => {
        setPictures([...pictures, picture]);
    };

    

    useEffect(() => {
        console.log('pictures in create post ', pictures);
    }, [pictures]);

    const handleTitleChange = event => {
        console.log('title ', event.target.value);
        setTitleForPreview(event.target.value);
    };

    const handlePreview = () => {
        setModalIsOpen(!modalIsOpen);
    };

    const preview = () => (
        <Modal 
            // className="w3-modal"
            isOpen={modalIsOpen}
        >
            <PreviewPost isPreview={true} image={pictures} title={titleForPreview} desc={descForPreview} />
            <button className="w3-button w3-margin w3-black w3-section w3-padding" onClick={handlePreview}>
                Close Preview
            </button>

        </Modal>
    );

    return(
        <React.Fragment>
            <Menu />
            <div className="w3-container w3-light-grey" id = "post-container">
                <div className="w3-col s12 w3-center" id="content">
                    <div className="w3-card w3-center w3-white" id="post-content">
                        <div className="w3-content">
                            <ImageUploader
                                withIcon={true}
                                buttonText='Choose an image'
                                onChange={onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                withPreview={true}
                                singleImage={true}
                            />
                        </div>
                        <hr/>
                        <form className="w3-container" onSubmit={handleSubmit(onSubmit)} >
                            <div className="w3-section">
                                <label className="w3-left"><b>Post Title:</b></label>
                                <input 
                                    className="w3-input w3-border w3-margin-bottom" 
                                    type="title" 
                                    name="title"
                                    placeholder="Enter The Post's Title"
                                    required
                                    onChange={handleTitleChange}
                                    ref={register({ required: true })}
                                />
                               <div className="w3-row">
                               <label className="w3-left w3-margin-bottom"><b>Post Description:</b></label>

                               </div>
                                <CKEditor 
                                    editor={ClassicEditor}
                                    onInit={ editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setDescForPreview({ data });
                                        console.log( { event, editor, data } );
                                    } }
                                    onBlur={ ( event, editor ) => {
                                        console.log( 'Blur.', editor );
                                    } }
                                    onFocus={ ( event, editor ) => {
                                        console.log( 'Focus.', editor );
                                    } }
                                />
                                <div className="w3-row">
                                    
                                    <input 
                                        className="w3-button w3-margin w3-black w3-section w3-padding" 
                                        type="submit"
                                        value="Create Post"
                                    />
                                    
                                   
                                   <button className="w3-button w3-margin w3-black w3-section w3-padding" onClick={handlePreview}>
                                        Preview Post
                                    </button>
                                  
                                    
                                </div>
                                    
                                
                            </div>
                        </form>
                    </div>
                </div>
                {preview()}
            </div>
        </React.Fragment>
    );
};

export default CreatePost;