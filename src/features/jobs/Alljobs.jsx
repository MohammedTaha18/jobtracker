import { useSelector, useDispatch } from 'react-redux';
import { filters, page, setfilters, setPage } from './filteredSlice';
import { allJobs, deleteJob } from './jobsSlice';
import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { islogged } from '../auth/authSlice';

const Alljobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (confirm('Do you want to delete this job?')) {
      dispatch(deleteJob({ id }));
      navigate('/alljobs');
      toast.info("Job Deleted Successfully!",{autoClose:1000}); 
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">All Jobs</h2>

      {/* Filters */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">Filter Jobs</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Status</label>
            <select className="form-select" value={status} onChange={handlefilter('status')}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="interview">Interview</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Job Type</label>
            <select className="form-select" value={jobType} onChange={handlefilter('jobType')}>
              <option value="all">All</option>
              <option value="fulltime">Full-Time</option>
              <option value="parttime">Part-Time</option>
              <option value="remote">Remote</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Sort By</label>
            <select className="form-select" value={sort} onChange={handlefilter('sort')}>
              <option value="newtoold">Newest to Oldest</option>
              <option value="oldtonew">Oldest to Newest</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Search</label>
            <input
              type="text"
              className="form-control"
              value={search}
              onChange={handlefilter('search')}
              placeholder="Position or Company"
            />
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="row">
        {paginatedJobs.length === 0 ? (
          <p className="text-muted text-center">No jobs found.</p>
        ) : (
          paginatedJobs.map((job) => (
            <div className="col-md-6 mb-4" key={job.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">{job.position}</h5>
                  <p className="card-text mb-1"><strong>Company:</strong> {job.company}</p>
                  <p className="card-text mb-1"><strong>Location:</strong> {job.jobLocation}</p>
                  <p className="card-text mb-1"><strong>Type:</strong> {job.jobType}</p>
                  <p className="card-text"><strong>Status:</strong> {job.status}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link to={`/editJob/${job.id}`} className="btn btn-outline-primary btn-sm">Edit</Link>
                  <button onClick={() => handleDelete(job.id)} className="btn btn-outline-danger btn-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => handlePage(Page - 1)}
          disabled={Page === 1}
        >
          Prev
        </button>
        <span className="fw-medium">Page {Page} of {totalPages}</span>
        <button
          className="btn btn-outline-secondary ms-2"
          onClick={() => handlePage(Page + 1)}
          disabled={Page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Alljobs;
