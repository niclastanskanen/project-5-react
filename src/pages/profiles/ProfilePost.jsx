import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcLike, FcDislike } from 'react-icons/fc';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import { Avatar, Dropdown } from '../../components';

const ProfilePost = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    image_filter,
    updated_at,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/image/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}`);
      navigate('/');
    } catch (err) {

    }
  };


  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {

    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {

    }
  };

  return (

    <div className="max-w rounded overflow-hidden shadow-lg pt-5">
      <Link to={`/profiles/${profile_id}`}>
        <Avatar src={profile_image} height={55} />
        {owner}
      </Link>
      <div className='flex flex-col justify-center items-center'>
        <Link to={`/image/${id}`}>
          <img className="flex justify-center" src={image} alt={title} />
        </Link>
        <div className="flex flex-col justify-center items-center px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">
            {content}
          </p>
        </div>
        <div className='flex justify-center items-center gap-10'>
          <FcLike className="cursor-pointer hover:ease-in" onClick={handleLike} size={25} />
          <FcDislike className="cursor-pointer" onClick={handleUnlike} size={25} />
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{likes_count} Likes</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{comments_count} Comments</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{updated_at}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{image_filter}</span>
        </div>
      </div>
      {is_owner && (
        <div>
          <Dropdown handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
      )}
    </div>
  )
}

export default ProfilePost