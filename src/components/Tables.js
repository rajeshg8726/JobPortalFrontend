import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
const PER_PAGE = 8; // 3 rows per page with 3 columns each


const Tables = () => {

const [jobPost, setJobPost] = useState([]);
const [currentPage, setCurrentPage] = useState(0);
const navigate = useNavigate();
const backendURL =  process.env.REACT_APP_API_URL;

useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axios.get( `${backendURL}/api/getAllJobs`);
        const result = res.data.allJobs;
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

    const offset = currentPage * PER_PAGE;
    const currentPageData = jobPost.slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(jobPost.length / PER_PAGE);

  return (
    <table class="table">
  <thead>
    <tr>
      <th scope="col">S.No.</th>
      <th scope="col">Company Name</th>
      <th scope="col">Job Role</th>
      <th scope="col">Batches</th>
      <th scope="col">Expected Pay</th>
    </tr>
  </thead>
  <tbody>
    
    { 

currentPageData.map((post , index) => (    
    <tr key={post._id}>
      <th scope="row">{index + 1}</th>
      <td> {post.title} </td>
      <td> {post.role} </td>
      <td> {post.batches} </td>
      <td> {post.pay} </td>
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

export default Tables