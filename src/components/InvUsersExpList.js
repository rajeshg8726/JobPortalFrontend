import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt // This should be `faTrashAlt` instead of `faTrashArrowUp`
} from '@fortawesome/free-solid-svg-icons';
const PER_PAGE = 10; // 3 rows per page with 3 columns each


const InvUsersExpList = () => {
  const {listURL} = useParams();
  const [jobPost, setJobPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getAdminAddedInvExp = async () => {
        try {
            let endpoint = '';
            // Determine the API endpoint based on the route param
            switch (listURL) {
                case 'users-added-interviews-list':
                    endpoint = 'getUsersInvExps';
                    break;
                case 'admin-added-interviews-list':
                    endpoint = 'getAdminAddedInvExps';
                    break;
                default:
                    console.log("Invalid route");
            }

            if (endpoint) {
              const res = await axios.get(`${backendURL}/api/${endpoint}`);
              const result = res.data.InvData;
              console.log(result);
              setJobPost(result);
            }
        } catch (error) {
            console.log('Error', error);
        }
    };

    getAdminAddedInvExp();
}, [listURL, backendURL]);



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
      const response = await axios.delete(`${backendURL}/api/deleteAdminAddedInvExp/${id}`, {
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
        alert('Interviews Deleted Successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // for Editing the job
  const handleEdit = (id) => {
    navigate(`/admin/edit-user-interviews/${id}`);
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
          <th scope="col">Company Name</th>
          <th scope="col">Job Role</th>
          <th scope="col">Title</th>
          <th scope="col">Worktype</th>
          <th scope="col" hidden>Details</th>
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
              <td> {post.companyName} </td>
              <td> {post.jobRole} </td>
              <td> {post.title} </td>
              <td> {post.experience} </td>
              <td hidden> {post.details} </td>
              <td> <button className='btn btn-sm'><FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(post.id)} /> </button>  <button className='btn btn-sm' onClick={() => handleDelete(post.id)} > <FontAwesomeIcon icon={faTrashAlt} /> </button>  </td>
            </tr>
          ))
        }
      </tbody>
      <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
            
    </table>
  )
}

export default InvUsersExpList

