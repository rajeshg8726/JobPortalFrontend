import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt // This should be `faTrashAlt` instead of `faTrashArrowUp`
} from '@fortawesome/free-solid-svg-icons';
const PER_PAGE = 10; // 3 rows per page with 3 columns each


const FeedbackTable = () => {

  const [jobPost, setJobPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/getContacts`);
        const result = res.data.feedbackData;
        console.log(result);
        setJobPost(result);
      } catch (error) {
        console.log(error);
      }

    }

    getJobs();

  }, []);

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/admin/login');

    }

  }, [navigate]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  // for deletig the job 
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${backendURL}/api/deleteFeedback/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',

        },
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Show success message
        // Optionally, refresh the job list or update the state to remove the deleted job from the table
      } else {
        alert('Feedback Not Deleted Successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // for Editing the job
  const handleEdit = (id) => {
    navigate(`/admin/edit-job/${id}`);
  }

  const offset = currentPage * PER_PAGE;
  const currentPageData = jobPost.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(jobPost.length / PER_PAGE);

  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">User Name</th>
          <th scope="col">User Email</th>
          <th scope="col">User Message</th>
          <th scope="col">Edit/Delete</th>
        </tr>
      </thead>
      <tbody>

        {

          currentPageData.map((post, index) => (
            <tr key={post.id}>
              <th scope="row">{index + 1}</th>
              <td> {post.name} </td>
              <td> {post.email} </td>
              <td> {post.message} </td>
              <td> <button className='btn btn-sm'><FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(post.id)} /> </button>  <button className='btn btn-sm' onClick={() => handleDelete(post.id)} > <FontAwesomeIcon icon={faTrashAlt} /> </button>  </td>
            </tr>
          ))
        }
      </tbody>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </table>
  )
}

export default FeedbackTable