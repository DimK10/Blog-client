import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import PreviewPost from './PreviewPost';
import Modal from 'react-modal';
import ImageUploader from 'react-images-upload';
import {useForm} from 'react-hook-form';
import RichTextEditor from '../core/RichTextEditor';
import {createNewPost} from '../../API/apiService';
import {API} from '../../config';
import { isAuthenticated } from '../../API/auth';
import { createNewCategory } from '../../API/apiService';


const CreateCategory = (props) => {
    
    const [values, setValues] = useState({
        title: '',
        about: '',
        success: '',
        errors: []
    });

    const {register, handleSubmit, watch, errors} = useForm ();
    
    const handleTitleChange = event => {
        console.log ('title ', event.target.value);
        setValues ({...values, title: event.target.value});
    };

    const handleAboutChange = event => {
        console.log('about: ', event.target.value);
        setValues ({...values, about: event.target.value});
    };

    const onSubmit = data => {
        let{title, about} = data;
        console.log('title ', title);
        console.log('about ', about);

        if(!title) {
            setValues({...values, errors: values.errors.push('category title cannot be empty!')});
            return;
        };

        if(!about) {
            setValues({...values, errors: values.errors.push('A category must have a short description!')});
            return;
        };

        setValues({...values, title, about});
        console.log('values with form data ', values);
        
        // Send data to server
        const {token, user} = isAuthenticated();
        if(!token || !user) {
            // This shouldnt happen - route is private to guests
            setValues({...values, errors: values.errors.push('You appear signed in, but you are not. Please sign in again')});
            // TODO - Might add a redirect here to /
            return;
        };

        let formData = {title: values.title, about: values.about};
        createNewCategory(token, user, formData)
        .then(data => {
            if(data.err) {
                setValues({...values, errors: values.errors.push(data.error)});
                return;
            };

            console.log('DATA IN CREATE CATEGORY: ', data);
            setValues({...values, success: 'Category was created successfully!'});
        })
        .catch(error => {
            console.log('CATCH ERROR ', error);
            setValues({...values, errors: values.errors.push(error)});
            return;
        });
    };

    const showError = (errorMsg) => (
        <div className="w3-panel w3-pale-red w3-border errorMessage">
            <div className="error">
                {'❌ ' + errorMsg}
            </div>
            <div className="closeMessage">
                <button 
                    className="w3-button closeIcon w3-hover-pale-red"
                    onClick={() =>{ 
                        let errorsArr = values.errors.filter((error) => ( error !== errorMsg ))
                        setValues({...values, errors: [...errorsArr]}) 
                        
                    }}
                >
                    &times; 
                </button>
            </div>
        </div>
    );

    const showSuccess = () => (
        <div className="w3-panel w3-pale-green w3-border errorMessage" style={{ display: values.success ? '' : 'none' }}>
            <div className="error">
                {'✔️ ' + values.success}
            </div>
            <div className="closeMessage">
                <button 
                    className="w3-button closeIcon w3-hover-pale-red"
                    onClick={() =>{ 
                        setValues({...values, success: ''}) 
                        
                    }}
                >
                    &times; 
                </button>
            </div>
        </div>
    );

    return (
        <React.Fragment>
            <Menu />
            <div className="w3-container w3-light-grey" id="post-container" >
                {showSuccess()}
                {values.errors.map((error, index) => (<React.Fragment key={index}>{showError(error)}</React.Fragment>))}
                <div className="w3-center"><h1>Create A New Category</h1></div>
                <div className="w3-col s12 w3-center" id="content-for-form">
                    <div className="w3-card w3-margin-top w3-center w3-white" id="category-content">
                        <form id="create-category-container" onSubmit={handleSubmit (onSubmit)}>
                            <div className="w3-section">
                                <div className="w3-row">
                                    <div className="w3-left"><b>Category Title:</b></div>
                                    <input 
                                        className="w3-input w3-border w3-margin-bottom"
                                        type="title" 
                                        name="title" 
                                        placeholder="Enter The New Category's Title"
                                        required
                                        onChange={handleTitleChange}
                                        ref={register ({required: true})}
                                    />
                                </div>
                                <div className="w3-row">
                                    <div className="w3-left"><b>Category Details:</b></div>
                                    <input 
                                        className="w3-input w3-border w3-margin-bottom"
                                        type="about" 
                                        name="about" 
                                        placeholder="Enter Some Info"
                                        required
                                        onChange={handleAboutChange}
                                        ref={register ({required: true})}
                                    />
                                </div>
                                <div className="w3-row">
                                <input
                                    className="w3-button w3-margin w3-black w3-section w3-padding"
                                    type="submit"
                                    value="Create Category"
                                />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CreateCategory;