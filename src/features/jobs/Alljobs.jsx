import { useSelector } from 'react-redux';
import { filters, page } from './filteredSlice';
import { setfilters, setPage } from './filteredSlice';
import { allJobs,deleteJob } from './jobsSlice';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const Alljobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(allJobs);
  const Page = useSelector(page);
  const { status, jobType, sort, search } = useSelector(filters);
  const limit = 5;

  const filteredJobs = useMemo(() => {
    let result = [...jobs];
    
    result = result.filter(
      (job) => 
        job.position.toLowerCase().includes(search.toLowerCase()) || 
        job.company.toLowerCase().includes(search.toLowerCase())
    );

    result = result.filter(
      (job) =>
        (status === 'all' || job.status === status) &&
        (jobType === 'all' || job.jobType === jobType)
    );

    // Apply sorting
    if (sort === 'newtoold') {
      result.sort((a, b) => b.date.localeCompare(a.date));
    } else {
      result.sort((a, b) => a.date.localeCompare(b.date));
    }

    return result;
  }, [jobs, status, jobType, sort, search]);


  const paginatedJobs = useMemo(() => {
    const startJob = (Page - 1) * limit;
    const endJob = startJob + limit;
    return filteredJobs.slice(startJob, endJob);
  }, [filteredJobs, Page, limit]);

  const totalPages = Math.ceil(filteredJobs.length / limit);

  const handlefilter = (field) => (e) => {
    if (Page !== 1) dispatch(setPage({ page: 1 }));
    dispatch(setfilters({ field, value: e.target.value }));
  };

  const handlePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage({ page: newPage }));
    }
  };
  const handleDelete = (id) => {
    try{
      confirm('Do You want to delete this job?')
      dispatch(deleteJob({id}))
      navigate('/alljobs')
    }catch(err){
      console.log(err)
    }
  } 

  return (
    <>
      <div className="container mt-4">
        <h3>All Jobs</h3>

        <h3>Filter</h3>
        <div>
          <label htmlFor="status">By Status:</label>
          <select name="status" id="status" onChange={handlefilter('status')} value={status}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="interview">Interview</option>
            <option value="declined">Declined</option>
          </select>
          <label htmlFor="jobtype">By JobType:</label>
          <select name="jobtype" id="jobtype" onChange={handlefilter('jobType')} value={jobType}>
            <option value="all">All</option>
            <option value="fulltime">Full-Time</option>
            <option value="parttime">Part-Time</option>
            <option value="remote">Remote</option>
            <option value="internship">Internship</option>
          </select>
          <label htmlFor="sort">Sort:</label>
          <select name="sort" id="sort" onChange={handlefilter('sort')} value={sort}>
            <option value="newtoold">newest to oldest</option>
            <option value="oldtonew">oldest to newest</option>
          </select>
        </div>
        <div>
          <label htmlFor="search">Search:</label>
          <input type="text" id="search" value={search} onChange={handlefilter('search')} />
        </div>
        <div className="row">
          {paginatedJobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            paginatedJobs.map((job, index) => (
              <div className="col-md-6 mb-3" key={index}>
                <div className="card p-3 shadow-sm">
                  <h5>{job.position}</h5>
                  <p>Company: {job.company}</p>
                  <p>Location: {job.jobLocation}</p>
                  <p>Type: {job.jobType}</p>
                  <p>Status: {job.status}</p>
                </div>
                <div>
                  <button><Link to={`/editJob/${job.id}`}>Update</Link></button>
                  <button onClick={()=>handleDelete(job.id)}><Link>delete</Link></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <button onClick={() => handlePage(Page - 1)} disabled={Page === 1}>prev</button>
        <span> Page {Page} of {totalPages} </span>
        <button onClick={() => handlePage(Page + 1)} disabled={Page >= totalPages}>next</button>
      </div>
    </>
  );
};

export default Alljobs;