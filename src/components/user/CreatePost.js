import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Menu from '../core/Menu';
import PreviewPost from './PreviewPost';
import Modal from 'react-modal';
import ImageUploader from 'react-images-upload';
import {useForm} from 'react-hook-form';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-theme-lark';
import RichTextEditor from '../core/RichTextEditor';
import {createNewPost} from '../../API/apiService';
import {fetchCategories} from '../../actions/blogApi';
import {API} from '../../config';

const CreatePost = props => {
  const [pictures, setPictures] = useState ([]);
  const [titleForPreview, setTitleForPreview] = useState ('');
  const [descForPreview, setDescForPreview] = useState ('');
  const [modalIsOpen, setModalIsOpen] = useState (false);
  const [error, setError] = useState('');
  const {register, handleSubmit, watch, errors} = useForm ();
  
  const consoleProps = () => {
    console.log(props);
  };
  const onSubmit = data => {
    let {title} = data;
    console.log(title);
    let urlImg = undefined;
    // if(pictures[0]) {
    //   urlImg = window.URL.createObjectURL(pictures[0]);
    // };
    console.log('picture ', urlImg);
    let post = {photo: pictures[0], title, description: descForPreview, categories: []};
    console.log(post);
    // TODO - Add categories with category id

    //Create formData
    let formData = new FormData();
    formData.append('photo', post.photo);
    formData.append('title', post.title);
    formData.append('description', post.description);
    formData.append('categories', '5e1a35dda3920962586138cb');
  
    // Send post to server
    createNewPost(formData)
    .then((data) => {
      console.log('DATA IN CREATE POST ', data);
      if(data.error) {
        console.log('data error ', data.error );
        setError(data.error);
      };
      
      // Add to data (which is the newly created post) the user and the createdAt

      // Redirect to newly created post
      props.history.push({
        pathname: `/post/${data._id}`,
        state: { post: data}
      });
    })
    .catch((error) => {
      console.log('catch error ', error );

      setError(error);
    });
  };

  const onDrop = picture => {
    setPictures(picture);
  };

  //React quill
  const html = (value) => {
    setDescForPreview(value);
  };

  useEffect (
    () => {
      console.log ('pictures in create post ', pictures);
    },
    [pictures]
  );

  useEffect (
    () => {
      if (modalIsOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    },
    [modalIsOpen]
  );

  useEffect(() => {
    props.dispatch(fetchCategories());
  },[]);

  const renderErrorMessage = () => (
    <div className="w3-panel w3-pale-red w3-border errorMessage" style={{ display: error ? '' : 'none' }}>
      <div className="error">
          {'❌ ' + error}
      </div>
      <div className="closeMessage">
          <button 
              className="w3-button closeIcon w3-hover-pale-red"
              onClick={() =>{ 
                  setError('');
              }}
          >
              &times; 
          </button>
      </div>
      </div>
  );


  const handleTitleChange = event => {
    console.log ('title ', event.target.value);
    setTitleForPreview (event.target.value);
  };

  const handlePreview = (event) => {
    event.preventDefault();
    setModalIsOpen (!modalIsOpen);
  };

  const preview = () => (
    <Modal
      // className="w3-white"
      isOpen={modalIsOpen}
      style={{
        overlay: {
          backgroundColor: 'white',
        },
      }}
    >
      <PreviewPost
        isPreview={true}
        image={pictures}
        title={titleForPreview}
        desc={descForPreview}
      />
      <button
        className="w3-button w3-margin w3-black w3-section w3-padding"
        onClick={handlePreview}
      >
        Close Preview
      </button>

    </Modal>
  );

  return (
    <React.Fragment>
      <Menu />
      <div className="w3-container w3-light-grey" id="post-container">
        <div className="w3-center"><h1>Create A New Post</h1></div>
        <div className="w3-col s12 w3-center" id="content-for-form">
          <div className="w3-card w3-center w3-white" id="post-content">
            <div className="w3-content">
              <ImageUploader
                withIcon={true}
                buttonText="Choose an image"
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={true}
                singleImage={true}
              />
            </div>
            <hr />
            <form id="create-post-container" className="w3-container" onSubmit={handleSubmit (onSubmit)}>
              <div className="w3-section">
                <label className="w3-left"><b>Post Title:</b></label>
                <input
                  className="w3-input w3-border w3-margin-bottom"
                  type="title"
                  name="title"
                  placeholder="Enter The Post's Title"
                  required
                  onChange={handleTitleChange}
                  ref={register ({required: true})}
                />
                <div className="w3-row">
                  <label className="w3-left w3-margin-bottom">
                    <b>Post Description:</b>
                  </label>

                </div>
                {/* <div style={{display: modalIsOpen ? 'none' : ''}}> */}
                <RichTextEditor html={html}/>
              </div>
              <div className="w3-row">

                <input
                  className="w3-button w3-margin w3-black w3-section w3-padding"
                  type="submit"
                  value="Create Post"
                />

                <button
                  className="w3-button w3-margin w3-black w3-section w3-padding"
                  onClick={handlePreview}
                >
                  Preview Post
                </button>

              </div>

            </form>
          </div>
        </div>
        {preview ()}
      </div>
      {consoleProps()}

    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state
  };
};

export default connect(mapStateToProps)(CreatePost);
