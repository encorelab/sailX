import $ from 'jquery';

export const uuid = () =>
  ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16))

export const currentDate = () => {
  let d = new Date()
  return d.toString()
}

export const shorten = (text, length) => {
  let t = text || ''
  if (t.length < length) {
    return t
  } else {
    return t.slice(0, length-3)+'...'
  }
}

export const compose = (...args) => initial => args.reduce(
    (result, fn) => fn(result),
    initial
)

export const composeReducers = (...args) => {
  const ret = (initState, action) => args.reduce(
    (state, fn) => fn(state, action),
      initState
  )
  return ret
}

// checks that some of the values in an object are not empty
export const notEmpty = (obj) => {
  if(!obj) { return false }
  return Object.keys(obj).reduce(
    (acc, val) => acc || Boolean(obj[val]), false)
}

export const identity = (e) => e

// for classState and studentState, we are getting an array from Horizon, but
// we will only have one element of each type with a given class/student ID
// this let's us easily pick that element out and switch on it
// for example getKey('tablet_locked', classState) will return the value if
// the element exists, and undefined if it does not
export const getKey = (key, array) => {
  return false
}

export const uploadFile = (file) => {
  const MAX_FILE_SIZE = 20971520;
  let formData = new FormData();
  formData.append( 'file', file );

  if (file.size < MAX_FILE_SIZE) {
    //dispatch({type: 'STARTUPLOADMEDIA_UI'});
    $.ajax({
      url: 'https://pikachu.coati.encorelab.org/',
      type: 'POST',
      success: success,
      error: failure,
      data: formData,
      cache: false,
      contentType: false,
      processData: false
    });
  } else {
    //jQuery().toastmessage('showErrorToast', "Max file size of 20MB exceeded");
    console.log("Max file size");
  }

  function failure(err) {
    //dispatch({type: 'ENDUPLOADMEDIA_UI'});   MOVE ME BACK TO index.jsx
    //jQuery().toastmessage('showErrorToast', "Photo could not be uploaded. Please try again");
    console.log('Photo could be uploaded')
  }

  function success(data, status, xhr) {
    //dispatch({type: 'ENDUPLOADMEDIA_UI'});
    console.log("UPLOAD SUCCEEDED!" + data);
  }
}