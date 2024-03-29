import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import Menu from '../core/Menu';
import PreviewPost from './PreviewPost';
import Modal from 'react-modal';
import ImageUploader from 'react-images-upload';
import FontAwesome from 'react-fontawesome';
import {useForm} from 'react-hook-form';
import '@ckeditor/ckeditor5-theme-lark';
import RichTextEditor from '../core/RichTextEditor';
import {fetchCategories} from '../../actions/blogApi';
import {updatePost} from '../../API/posts/apiPosts';
import {API} from '../../config';
import { withRouter } from 'react-router-dom';

const UpdatePost = props => {
  const [pictures, setPictures] = useState ([]);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');

  const [imagePathForPreview, setImagePathForPreview] = useState('');
  const [titleForPreview, setTitleForPreview] = useState ('');
  const [descForPreview, setDescForPreview] = useState ('');
  const [categoriesForPreview, setCategoriesForPreview] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState (false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryids, setCategoryIds] = useState([]);
  const {register, handleSubmit, watch, errors} = useForm ();

  const [categoriesToSelect, setCategoriesToSelect] = useState([]);

  let categoriesRefs = useRef([]);
  categoriesRefs.current = [];

  let imageUploader = useRef();
  
  const consoleProps = () => {
    // console.log(`${API}/post/image/${props.location.state.post._id}`);
    // console.log(props);
  };

  const onSubmit = data => {
    let {title} = data;
    let urlImg = undefined;
    let post = {_id: props.location.state.post._id, title, description: descForPreview, categories: []};
    if(pictures[0] !== undefined) {
      post = {...post, photo: pictures[0]};
    }
    // TODO - Add categories with category id

    //Create formData
    let formData = new FormData();
    formData.append('photo', post.photo);
    formData.append('title', post.title);
    formData.append('description', post.description);
    formData.append('categories', JSON.stringify(categoryids));
  
    // Send post to server
    updatePost(formData, post._id)
    .then((data) => {
      if(data.error) {
        console.log('data error ', data.error );
        setError(data.error);
      };

      // Add populated data of comments, categories and user to post      
      
      // Redirect to newly created post
      props.history.push({
        pathname: `/post/${data._id}`,
        state: { post: data }
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

  const handleCategoryClick = (index) => {

  };

  const handleCategoryDoubleClick = (categoryIndex) => {
    console.log('categories to select ', categoriesToSelect);
    let categoriesToChoose = categoriesToSelect.map((category) => {
      if(categoryIndex === category._id) {
        return {...category, chosen: true }
      };
      return {...category}
    });


    setCategoriesToSelect([...categoriesToChoose]);

    addSelectedCategoriesForPreview(categoriesToChoose);
  };

  const deleteSelectedCategory = (categoryId) => {
    let categoriesToChoose = categoriesToSelect.map((category) => {
      if(categoryId === category._id) {
        return { ...category, chosen: false }
      }
      return {...category}
    });

    setCategoriesToSelect([...categoriesToChoose]);

    addSelectedCategoriesForPreview(categoriesToChoose);
  };


  useEffect(()=>{
    console.log('categories to select ', categoriesToSelect);

    let categoriesIds = [];
    categoriesToSelect.map((category) => {
      if(category.chosen) {
        categoriesIds.push(category._id);
      };
    });

    setCategoryIds([...categoriesIds]);

  },[categoriesToSelect])

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

    console.log('props.location.state.post ', props.location.state.post);

    // set titleForPreview
    setTitleForPreview(props.location.state.post.title);
    setDescForPreview(props.location.state.post.description.replace(/"/gi, ''));

    if(props.location.state.post.photoId) {
      imageUploader.current.state.pictures = [`${API}/post/image/${props.location.state.post._id}`];
      setImagePathForPreview(`${API}/post/image/${props.location.state.post._id}`);
    };

    setPostTitle(props.location.state.post.title);
    
    let categoriesToChoose = props.data.asyncCategoriesReducer.categories.map((category) => {
      let newCategory = { ...category, chosen: false }
      return newCategory;
    });

    setCategoriesToSelect([...categoriesToChoose]);

    // Make categories that the user has already chosen, be chosen in the page
    let selectedCategoriesIds = props.location.state.post.categories.map((category) => {
      return category._id;
    });

    let categoriesChosen = categoriesToChoose.map((category) => {
      let values = [];

      values = selectedCategoriesIds.map((catId) => {
        if(catId === category._id) {
          return true;
        };
         return false;
      });

      if(values.includes(true)) {
        return { ...category, chosen: true }
      }

      return {...category, chosen: false}
    });

      //setCategoriesForPreview
    addSelectedCategoriesForPreview(categoriesChosen);

    setCategoriesToSelect([...categoriesChosen]);
    setCategories([...categoriesChosen]);
  },[]);

  const addSelectedCategoriesForPreview = (categories) => {
    let categoriesSelected = categories.filter((category) => {
      return category.chosen === true;
    })
    console.log('categories chosen ', categoriesSelected);
    setCategoriesForPreview([...categoriesSelected]);
  };

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
        image={imagePathForPreview}
        title={titleForPreview}
        desc={descForPreview}
        categories={categoriesForPreview}
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
        <div className="w3-center"><h1>Update A Post</h1></div>
        <div className="w3-col s12 w3-center" id="content-for-form">
          <div className="w3-card w3-center w3-white" id="post-content">
            <div className="w3-content">
              <ImageUploader
                ref={imageUploader}
                withIcon={true}
                buttonText="Choose an image"
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={true}
                singleImage={true}
                // defaultImage={`${API}/post/image/${props.location.state.post._id}`}
              />
            </div>
            <hr />
            <form id="create-post-container" className="w3-container" onSubmit={handleSubmit (onSubmit)}>
              <div className="w3-section">
                <label className="w3-left"><b>Post Title:</b></label>
                <input
                  className="w3-input w3-border w3-margin-bottom"
                  type="text"
                  name="title"
                  placeholder="Enter The Post's Title"
                  required
                  value={postTitle}
                  onChange={handleTitleChange}
                  ref={register ({required: true})}
                />
                <div className="w3-row">
                  <label className="w3-left w3-margin-bottom">
                    <b>Post Description:</b>
                  </label>

                </div>
                <RichTextEditor html={html} postDescription={props.location.state.post.description.replace(/"/gi, '')}/>
              </div>
              <div className="w3-row">
                <label className="w3-left w3-margin-bottom">
                  <b>Choose categories-tags:</b>
                </label>
                <div className="categories-container">
                  <div className="categories-list">
                  {categoriesToSelect.map((category, index) => (
                    !category.chosen && <button
                        key={index}
                        id={index}
                        className="w3-button w3-hover-light-blue category-item"
                        onClick={(event) =>{
                            event.preventDefault();
                            handleCategoryClick(category._id)
                          }}
                        onDoubleClick={(event)=>{
                            // Prevent form submission
                            event.preventDefault();
                            handleCategoryDoubleClick(category._id)
                          }}
                      >
                        {category.title}
                      </button>
                  ))}
                  </div>
                  <div className="selected-categories">
                    {/* {showSelectedCategories(categoriesToSelect)} */}
                    {categoriesToSelect.map((category, index) => (
                      category.chosen && <span
                          key={index}
                          id={index}
                          className="w3-tag selected-category-item"
                        >
                          {category.title}  <FontAwesome name="times-circle" onClick={() => {deleteSelectedCategory(category._id)}} />
                        </span>
                    ))}
                  </div>
                </div>
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


export default connect(mapStateToProps)(withRouter(UpdatePost));
