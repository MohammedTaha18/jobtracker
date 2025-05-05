import { allJobs, jobTypes, jobStatus, changeChartType, chartType } from "./jobsSlice"
import { useSelector, useDispatch } from "react-redux"
import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

const Stats = () => {
    const dispatch = useDispatch()
    const jobs = useSelector(allJobs)
    const chart = useSelector(chartType)
    const jobStatusList = useSelector(jobStatus)
    const jobTypeList = useSelector(jobTypes)
    const no_of_jobs = jobs.length
    //chart1
    const jobStatusCounts = jobStatusList.map((status) => {
        return { "status": status, "No_Of_jobs_perStatus": 0 }
    })

    jobs.forEach((job) => {
        const jobStatusObject = jobStatusCounts.find((job2) => job.status === job2.status)
        if (jobStatusObject) {
            jobStatusObject["No_Of_jobs_perStatus"]++;
        }
    })
    //chart2
    const jobTypeCounts = jobTypeList.map((type) => {
        return { "name": type, "No_Of_jobs_perType": 0 }
    })
    jobs.forEach((job) => {
        const jobTypeObject = jobTypeCounts.find((job2) => job.jobType === job2.name)
        if (jobTypeObject) {
            jobTypeObject["No_Of_jobs_perType"]++;
        }
    })

    const handleChange = (e) => {
        dispatch(changeChartType({ value: e.target.value }))
    }

    return (
        <div>
          <div className="container py-5">
  <div className="row mb-4 justify-content-center">
    <div className="col-md-8 text-center">
      <h1 className="display-5 fw-bold mb-3 text-primary">Job Application Analysis</h1>
      <h4 className="text-secondary mb-4">
        Number of Jobs Applied: <span className="text-dark">{no_of_jobs}</span>
      </h4>
      <div className="form-group">
        <label htmlFor="analysis" className="form-label fw-medium mb-2">Choose Chart Type:</label>
        <select
          id="analysis"
          className="form-select w-50 mx-auto"
          onChange={handleChange}
        >
          <option value="perStatus">Jobs Per Status</option>
          <option value="perType">Jobs Per Type</option>
        </select>
      </div>
      </div>
      </div>
      </div>
            {chart === 'perStatus' ? (
                <div className="container mt-5">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="card shadow">
                      <div className="card-header bg-success text-white text-center">
                        <h5 className="mb-0">Jobs per Status</h5>
                      </div>
                      <div className="card-body">
                        <BarChart width={600} height={450} data={jobStatusCounts}>
                          <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
                          <XAxis
                            dataKey="status"
                            label={{
                              value: 'Job Status',
                              position: 'outsideBottom',
                              dy: 10,
                              textAnchor: 'middle'
                            }}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis
                            label={{
                              value: 'No of Jobs',
                              angle: -90,
                              position: 'insideLeft',
                              textAnchor: 'middle',
                            }}
                            tick={{ fontSize: 12 }}
                          />
                          <Bar dataKey="No_Of_jobs_perStatus" fill="#20c997" barSize={40} />
                        </BarChart>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            ) : (
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card shadow">
                                <div className="card-header bg-primary text-white text-center">
                                    <h5 className="mb-0">Jobs per Type</h5>
                                </div>
                                <div className="card-body">
                                    <BarChart width={600} height={450} data={jobTypeCounts}>
                                        <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="name"
                                            label={{
                                                value: 'Job Types',
                                                position: 'outsideBottom',
                                                dy: 10,
                                                textAnchor: 'middle'
                                            }}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            label={{
                                                value: 'No of Jobs',
                                                angle: -90,
                                                position: 'insideLeft',
                                                textAnchor: 'middle',
                                            }}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <Bar dataKey="No_Of_jobs_perType" fill="#0d6efd" barSize={40} />
                                    </BarChart>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Stats
