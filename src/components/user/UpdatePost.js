import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import Menu from '../core/Menu';
import PreviewPost from './PreviewPost';
import Modal from 'react-modal';
import ImageUploader from 'react-images-upload';
import FontAwesome from 'react-fontawesome';
import {useForm} from 'react-hook-form';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-theme-lark';
import RichTextEditor from '../core/RichTextEditor';
import {createNewPost} from '../../API/apiService';
import {fetchCategories} from '../../actions/blogApi';
import {API} from '../../config';
import { withRouter } from 'react-router-dom';

const UpdatePost = props => {
  const [pictures, setPictures] = useState ([]);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [titleForPreview, setTitleForPreview] = useState ('');
  const [descForPreview, setDescForPreview] = useState ('');
  const [modalIsOpen, setModalIsOpen] = useState (false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryids, setCategoryIds] = useState([]);
  const {register, handleSubmit, watch, errors} = useForm ();

  // const [firstRender, setFirstRender] = useState(true);

  const [categoriesToSelect, setCategoriesToSelect] = useState([]);

  let categoriesRefs = useRef([]);
  categoriesRefs.current = [];

  let imageUploader = useRef();

  // const addToRefs = el => {
  //   if (el && !categoriesRefs.current.includes(el)) {
  //     // categoriesRefs.current.push(el);
  //     // Check if category is active for that post
  //     console.log('inner HTML ', el.innerHTML);

  //     props.location.state.post.categories.map((category) => {
  //       if(el.innerHTML === category.title) {
  //         el.style = "display:none";
  //       };
  //     });
  //     categoriesRefs.current = [...categoriesRefs.current, el];
  //     // setCatRefs([...catRefs, el]);
  //   }
  // };
  
  const consoleProps = () => {
    // console.log(`${API}/post/image/${props.location.state.post._id}`);
    // console.log(props);
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
    formData.append('categories', JSON.stringify(categoryids));
  
    // Send post to server
    createNewPost(formData)
    .then((data) => {
      console.log('DATA IN CREATE POST ', data);
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
    // console.log(categoriesRefs);
    // console.log('index ', index);
    // if (categoriesRefs.current[index].className.indexOf("active") === -1) {
    //   categoriesRefs.current[index].className += " active";
    // } else {
    //   categoriesRefs.current[index].className = categoriesRefs.current[index].className.replace(" active", "");
    // };
  };

  const handleCategoryDoubleClick = (index) => {
    
    // // Stop showing the category on the left 
    // console.log('categories refs inside double click ', categoriesRefs.current);
    // categoriesRefs.current[index].style = "display:none"

    // // Add that element to the categories array which will be used as categories for that Post
    // // setCategories([...categories, props.data.asyncCategoriesReducer.categories[index]]);
    // setCategories([
    //   ...categories,
    //   {
    //     category: props.data.asyncCategoriesReducer.categories[index],
    //     initialIndex: index
    //   }
    // ])

    // Remove from the left
    let categoryChosen = {};

    let categoriesToChoose = categoriesToSelect.filter((category) => {
      // if(category._id === index) {
      //   categoryChosen = category;
      //   return false;
      // } else {
      //   return true;
      // };

      if(category._id === index) {
        categoryChosen = category;
      }
      return category._id !== index;
    });

    console.log('categoriesToChoose in double click ', categoriesToChoose);

    setCategoriesToSelect([...categoriesToChoose]);



    // Add to the right
    setCategories([...categories, categoryChosen]);
  };



  const showSelectedCategories = () => {
    if(categories.length > 0) {
      return categories.map((category, index)=> (
        <span
          key={index}
          className="w3-tag selected-category-item"
        >
          {category.title}  <FontAwesome name="times-circle" onClick={() => {deleteSelectedCategory(category._id)}} />
        </span>
      ))
    };
  };

  const deleteSelectedCategory = (categoryId) => {
    // // Remove the selected category and re appear in left div to select
    let categoriesSelected = categories.filter((category) => {
      return category._id !== categoryId
    });

    setCategories([...categoriesSelected]);

    // Add category to the left
    let categoriesChosen = props.data.asyncCategoriesReducer.categories.filter((category) => {
      if(categoriesSelected.length > 0) {
        let result = categoriesSelected.map((element) => {
          return element._id === category._id
        });
        return result.includes(false)
      } else {
        return true;
      }
    });

    setCategoriesToSelect([...categoriesChosen]);






    // // let newCategories = categories.splice(indexOfSelectedCategory, 1);
    

    // // Find initialIndex differently
    // let initIndex = props.data.asyncCategoriesReducer.categories.findIndex(category => category._id === categoryId)

    // console.log('INIT INDEX', initIndex);
    // console.log('categoriesRefs.current[initIndex].style before ', categoriesRefs.current[initIndex]);

    // // Re-appear on left box

    // categoriesRefs.current[initIndex].style = { display: 'inline-block' };

    // console.log('categoriesRefs.current[initIndex].style afer ', categoriesRefs.current[initIndex]);


    // console.log('initial category id', categoryId);
    // let newCategories = categories.filter(category => categoryId !== category.category._id)
    // console.log('newCategories after deleteing element ', newCategories);
    // setCategories([...newCategories]);
  };

  //  const simulateDoubleClickingActiveCategories = (categoriesRefs) => {
  //   if(categoriesRefs.current.length === props.data.asyncCategoriesReducer.categories.length) {
  //       props.location.state.post.categories.map((category) => {
  //           // console.log('category id ', category._id);
  //           console.log('categoriesRefs in simulate ', categoriesRefs);
  //           console.log(categoriesRefs.current.length);
            
    
            
  //               // categoriesRefs.current[category._id].style = "display:none"
  //               categoriesRefs.current.map((categoryRef) => {
    
  //                   console.log('categoryref innerHTML ', categoryRef.innerHTML);
  //                   console.log('category title ', category.title);
    
  //                   if(categoryRef.innerHTML === category.title) {
  //                       categoryRef.style = { display: 'none' };
  //                   }
  //               })
    
  //               setCategories([
  //                   ...categories,
  //                   {
  //                     category: category,
  //                     initialIndex: category._id
  //                   }
  //                 ]);
          
    
  //       });
  //   };

  // };

  useEffect(()=>{
    console.log('categories on change ', categories);
  },[categories])

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

    imageUploader.current.state.pictures = [`${API}/post/image/${props.location.state.post._id}`];

    // console.log('imageUploader ref ', imageUploader);

    // Add data to state variables t oshow in each field in order to update
    setPostTitle(props.location.state.post.title);

    console.log('props.location.state.post ', props.location.state.post);

    // Create a state array of categories to choose. This will be modified based on user 
    // Adding a category for a post ( by removing the category - or if a category is already chosen )
    let categoriesToChoose = props.data.asyncCategoriesReducer.categories.filter((category) => {
      let result = props.location.state.post.categories.map((element) => {
        return element._id !== category._id
      });
      return !result.includes(false)
    });

    let categoriesChosen = props.data.asyncCategoriesReducer.categories.filter((category) => {
      let result = props.location.state.post.categories.map((element) => {
        return element._id !== category._id
      });
      return result.includes(false)
    });
    
    console.log('categories array without the categories of post to update ', categoriesToChoose);
    console.log('categories chosen already ', categoriesChosen);
    setCategoriesToSelect([...categoriesToChoose]);
    setCategories([...categoriesChosen]);


    // setPostDescription(props.location.state.post.description);

    
    // simulateDoubleClickingActiveCategories();
  },[]);

  useEffect(() => {
    // console.log('post desc that should be passed to richtexteditor ', postDescription);

  }, [postDescription]);

//   useEffect(() => {
//     console.log('imageUploader ref ', imageUploader);

//   }), [imageUploader.current];

  // Helper useEffect, to update categoryIds immediately upon state category change
  // useEffect(() => {
  //   setCategoryIds(categories.map((category) => {
  //     return category.category._id;
  //   })); 
  // }, [categories]);  

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

  const handleInitialValue = (event) => {
      
  }


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
                {/* <div style={{display: modalIsOpen ? 'none' : ''}}> */}
                <RichTextEditor html={html} postDescription={props.location.state.post.description}/>
              </div>
              <div className="w3-row">
                <label className="w3-left w3-margin-bottom">
                  <b>Choose categories-tags:</b>
                </label>
                <div className="categories-container">
                  <div className="categories-list">
                  {categoriesToSelect.map((category, index) => (
                    <button
                        key={index}
                        className="w3-button w3-hover-light-blue category-item"
                        onClick={(event) =>{
                            event.preventDefault();
                            handleCategoryClick(index)
                          }}
                        onDoubleClick={(event)=>{
                            // Prevent form submission
                            event.preventDefault();
                            handleCategoryDoubleClick(index)
                          }}
                      >
                        {category.title}
                      </button>
                  ))}
                    {/* {
                        props.data.asyncCategoriesReducer.categories.map((category, index) => (
                      <button
                        key={index}
                        className="w3-button w3-hover-light-blue category-item"
                        onClick={(event) =>{
                            event.preventDefault();
                            handleCategoryClick(index)
                          }}
                        onDoubleClick={(event)=>{
                            // Prevent form submission
                            event.preventDefault();
                            handleCategoryDoubleClick(index)
                          }}
                      >
                        {category.title}
                      </button>
                    ))} */}
                  </div>
                  <div className="selected-categories">
                    {showSelectedCategories()}
                    

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
