import React, { useState, useEffect, useContext } from "react";
import { tokenContext } from "../../App";
import jwt_decode from "jwt-decode";
import "./style.css";
import axios from "axios";
import COD from "./img/Screenshot_2.png";
import eldenring from "./img/test.webp";

const localStorage = window.localStorage;
const Addpost = () => {
  const { Token, Settoken } = useContext(tokenContext);
  let decoded = "";
  if (Token) {
    decoded = jwt_decode(Token);
  }
  let postEdiat = "";
  let id = "";
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  const [erorr, seterorr] = useState("");
  const [url, setUrl] = useState("");
  const [addtitle, Setaddtitle] = useState("");
  const [title, Settitle] = useState("");
  const [newposts, Setposts] = useState("");
  const [addcomment, Setcomment] = useState("");
  const [updatecomment, Setupdatecomment] = useState("");
  // const [token,Settoken]=useState("")

  const Comment = (props) => {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          {props.content}
        </div>
      </div>
    );
  };

  const CommentPopup = () => {
    setIsOpen(!isOpen);
  };

  const Getallposts = () => {
    axios
      .get("http://localhost:5000/posts")
      .then((resulat) => {
        Setposts(resulat.data.posts);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    Getallposts();
  }, []);

  const addpost = async () => {
    await axios
      .post(
        "http://localhost:5000/posts/newpost",
        { title: addtitle },
        { headers: { Authorization: `Bearer ${Token}` } }
      )
      .then((resulat) => {
        Getallposts();
      })
      .catch();
  };

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "GGwebsite");
    data.append("cloud_name", "dhiowfje1");
    fetch("https://api.cloudinary.com/v1_1/dhiowfje1/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        setUrl(data.url);

        await axios
          .post(
            "http://localhost:5000/posts/newpost",
            { title: addtitle, postimag: data.url },
            { headers: { Authorization: `Bearer ${Token}` } }
          )
          .then((resulat) => {
            Getallposts();
          })
          .catch((err) => {});
      })
      .catch();
  };

  const allposts =
    newposts &&
    newposts.map((element, index) => {
      if (element.author === decoded.userId) {
        return (
          <div className="mainDaiv">
            <div className=" mainimgAndName">
              <div className="imgAndName">
                <div className="imgAndNameChild">
                  <img src={element.imag} className="img"></img>
                  <h2 className="posttext">{element.creater}</h2>
                </div>
                <div className="posttext">
                  <h1 className="posttext">{element.title}</h1>
                </div>
              </div>
            </div>

            {element.postimag ? (
              <img src={element.postimag} className="postImg"></img>
            ) : (
              ""
            )}
            <div className="butons">
              <button
                className="tokenAddpost"
                onClick={() => {
                  axios
                    .post(
                      `http://localhost:5000/comment/new/${element._id}`,
                      { comment: title },
                      { headers: { Authorization: `Bearer ${Token}` } }
                    )
                    .then((resulat) => {
                      Getallposts();
                    })
                    .catch((err) => {});
                }}
              >
                comment
              </button>
              <button
                className="buttins"
                onClick={() => {
                  axios
                    .delete(`http://localhost:5000/posts/${element._id}`)
                    .then((resulat) => {
                      Getallposts();
                    })
                    .catch((err) => {});
                }}
              >
                delete
              </button>
              <button
                className="buttins"
                onClick={() => {
                  axios
                    .put(`http://localhost:5000/posts/${element._id}`, {
                      title: title,
                    })
                    .then((resulat) => {
                      Getallposts();
                    })
                    .catch((err) => {});
                }}
              >
                update
              </button>
            </div>
            <input
              className="inputt"
              onChange={(e) => {
                Settitle(e.target.value);
              }}
              placeholder="Add comment"
            ></input>
            <div>
              {element.comments.map((ele, i) => {
                if (ele.commenter === decoded.userId) {
                  return (
                    <div className="imgAndName">
                      <div className="commentImgSndName">
                        <img src={ele.imag} className="img"></img>
                        <h3 className="commentername">{ele.commenterName}</h3>
                      </div>
                      <h2 className="comment">{ele.comment}</h2>
                      <div className="butons">
                        <button
                          className="buttins"
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:5000/comment/delete/${ele._id}`
                              )
                              .then((resulat) => {
                                Getallposts();
                              })
                              .catch((err) => {});
                          }}
                        >
                          delete
                        </button>
                        <button
                          className="buttins"
                          onClick={() => {
                            axios
                              .put(
                                `http://localhost:5000/comment/update/${ele._id}`,
                                { comment: updatecomment }
                              )
                              .then((resulat) => {
                                Getallposts();
                              })
                              .catch((err) => {});
                          }}
                        >
                          {" "}
                          Update
                        </button>
                        <input
                          className="inputt"
                          placeholder="update comment"
                          onChange={(e) => {
                            Setupdatecomment(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="imgAndName">
                      <div className="commentImgSndName">
                        <img src={ele.imag} className="img"></img>
                        <h3 className="commentername">{ele.commenterName}</h3>
                      </div>
                      <h2 className="comment">{ele.comment}</h2>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      } else {
        return (
          <div className="mainDaiv">
            <div className=" mainimgAndName">
              <div className="imgAndName">
                <div className="imgAndNameChild">
                  <img src={element.imag} className="img"></img>
                  <h3 className="posttext">{element.creater}</h3>
                </div>
                <div className="posttext">
                  <h1 className="posttext">{element.title}</h1>
                  {element.postimag ? (
                    <img src={element.postimag} className="postImg"></img>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <button
              className="tokenAddpost"
              onClick={() => {
                axios
                  .post(
                    `http://localhost:5000/comment/new/${element._id}`,
                    { comment: addcomment },
                    { headers: { Authorization: `Bearer ${Token}` } }
                  )
                  .then((resulat) => {
                    Getallposts();
                  })
                  .catch((err) => {});
              }}
            >
              comment
            </button>
            <input
              placeholder="Add comment"
              className="inputt"
              onChange={(e) => {
                Setcomment(e.target.value);
              }}
            ></input>

            <div>
              {element.comments.map((ele, i) => {
                if (ele.commenter === decoded.userId) {
                  return (
                    <div className="imgAndName">
                      <div className="commentImgSndName">
                        <img src={ele.imag} className="img"></img>
                        <h3 className="commentername">{ele.commenterName}</h3>
                      </div>
                      <h2 className="comment">{ele.comment}</h2>

                      <button
                        className="buttins"
                        onClick={() => {
                          axios
                            .delete(
                              `http://localhost:5000/comment/delete/${ele._id}`
                            )
                            .then((resulat) => {
                              Getallposts();
                            })
                            .catch((err) => {});
                        }}
                      >
                        delete
                      </button>
                      <button
                        className="buttins"
                        onClick={() => {
                          axios
                            .put(
                              `http://localhost:5000/comment/update/${ele._id}`,
                              { comment: updatecomment }
                            )
                            .then((resulat) => {
                              Getallposts();
                            })
                            .catch((err) => {});
                        }}
                      >
                        {" "}
                        Update
                      </button>
                      <input
                        className="inputt"
                        placeholder="update comment"
                        onChange={(e) => {
                          Setupdatecomment(e.target.value);
                        }}
                      ></input>
                    </div>
                  );
                } else {
                  return (
                    <div className="imgAndName">
                      <div className="commentImgSndName">
                        <img src={ele.imag} className="img"></img>
                        <h3 className="commentername">{ele.commenterName}</h3>
                      </div>
                      <h2 className="comment">{ele.comment}</h2>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      }
    });

  return (
    <div className="whitespace">
      <img src={COD} className="whitespaceimh"></img>
      <div className="postsDiv">
        {
          <div>
            <button onClick={CommentPopup}></button>

            {isOpen && (
              <Comment
                content={
                  <>
                    <button
                      onClick={() => {
                        axios
                          .put(`http://localhost:5000/posts/${id}`, {
                            title: "moad",
                          })
                          .then((resulat) => {
                            Getallposts();
                          })
                          .catch((err) => {});
                      }}
                    >
                      comment
                    </button>

                    <input
                      className="inputt"
                      onChange={(e) => {
                        postEdiat = e.target.value;
                      }}
                    ></input>
                  </>
                }
                handleClose={CommentPopup}
              />
            )}
          </div>
        }
        {erorr}
        {allposts}
        <div className="addPostMain">
          <button
            className="addpostbutton"
            onClick={() => {
              if (!image && addtitle === "") {
                seterorr("enter your  post");
              } else if (!image) {
                addpost();
              } else {
                uploadImage();
              }
            }}
          >
            Add post
          </button>
          <input
            className="postinput"
            placeholder="Add post"
            onChange={(e) => {
              Setaddtitle(e.target.value);
            }}
          ></input>
          <input
            className="input"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
        </div>
      </div>
      <div className="whitespaceimh">
        <img src={eldenring} className="whitespaceim"></img>
      </div>
      {isOpen ? (
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <p>Some text in the Modal..</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Addpost;
