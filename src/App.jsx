import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://3.106.138.222:8080/api/employees'

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  department: '',
  role: '',
}

function App() {
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const [savedMessage, setSavedMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadEmployees()
  }, [])

  async function loadEmployees(showLoading = true) {
    if (showLoading) {
      setLoading(true)
    }
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error('Failed to load employees')
      }
      const data = await response.json()
      setEmployees(data)
      setError('')
    } catch {
      setError('Could not reach the API at localhost:8081. Start the backend and refresh.')
    } finally {
      if (showLoading) {
        setLoading(false)
      }
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setError('')
    setSavedMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.')
      setSavedMessage('')
      return
    }

    setSaving(true)
    setError('')
    setSavedMessage('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          department: form.department.trim(),
          role: form.role.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save employee')
      }

      const saved = await response.json()
      setForm(EMPTY_FORM)
      setSavedMessage(`${saved.name} was saved.`)
      await loadEmployees(false)
    } catch {
      setError('Could not save employee. Make sure the backend is running on localhost:8081.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">localhost:8081</p>
          <h1>Employee Management</h1>
          <p className="subtitle">
            View employee details and save a new employee using the backend APIs.
          </p>
        </div>
        <div className="count-badge">{employees.length} employees</div>
      </header>

      <main className="layout">
        <section className="card form-card">
          <h2>Save new employee</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Full name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane.doe@company.com"
                autoComplete="email"
              />
            </label>
            <label>
              Phone
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="555-0100"
                autoComplete="tel"
              />
            </label>
            <label>
              Department
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Engineering"
              />
            </label>
            <label>
              Role
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Software Engineer"
              />
            </label>

            {error ? <p className="message error">{error}</p> : null}
            {savedMessage ? <p className="message success">{savedMessage}</p> : null}

            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save employee'}
            </button>
          </form>
        </section>

        <section className="card table-card">
          <h2>Employee details</h2>
          {loading ? (
            <p className="empty">Loading employees from localhost:8081...</p>
          ) : employees.length === 0 ? (
            <p className="empty">No employees yet. Save the first one on the left.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phone || '—'}</td>
                      <td>{employee.department || '—'}</td>
                      <td>{employee.role || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
