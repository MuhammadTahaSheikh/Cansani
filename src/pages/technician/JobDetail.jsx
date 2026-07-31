import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Navigation } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import api from '@/lib/api'

export default function TechJobDetail() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')
  const [busy, setBusy] = useState('')
  const [file, setFile] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/technician/jobs')
      const found = (data.data?.jobs || []).find((j) => String(j.id) === String(id))
      if (found) setJob(found)
      else {
        const single = await api.get(`/appointments/${id}`).catch(() => null)
        setJob(single?.data?.data?.appointment || single?.data?.data || null)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load job')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [id])

  const saveNotes = async () => {
    if (!notes.trim()) return
    setBusy('notes')
    try {
      await api.post(`/technician/jobs/${id}/notes`, { notes })
      toast.success('Notes saved')
      setNotes('')
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save notes')
    } finally {
      setBusy('')
    }
  }

  const uploadPhotos = async () => {
    if (!file) {
      toast.error('Choose a photo')
      return
    }
    setBusy('photo')
    try {
      const form = new FormData()
      form.append('photos', file)
      form.append('appointment_id', id)
      form.append('photo_type', 'after')
      await api.post('/technician/photos', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      toast.success('Photo uploaded')
      setFile(null)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed')
    } finally {
      setBusy('')
    }
  }

  const complete = async () => {
    if (!confirm('Mark this job complete?')) return
    setBusy('complete')
    try {
      await api.post(`/technician/jobs/${id}/complete`, { notes: notes || undefined })
      toast.success('Job completed')
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not complete')
    } finally {
      setBusy('')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  if (!job) {
    return (
      <Card>
        <p className="text-sm text-muted">Job not found.</p>
        <Link to="/technician/jobs" className="mt-3 inline-block text-teal">
          Back to jobs
        </Link>
      </Card>
    )
  }

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${job.address_line1}, ${job.city}, ${job.state || 'FL'} ${job.zip_code || ''}`
  )}`

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link to="/technician/jobs" className="text-sm font-medium text-teal">
          ← Jobs
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold">
          {job.customer_first_name} {job.customer_last_name}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge>{job.status}</Badge>
          <span className="text-sm text-muted">{job.time_slot}</span>
        </div>
      </div>

      <Card className="space-y-2 text-sm">
        <p className="font-medium">
          {job.address_line1}
          {job.address_line2 ? `, ${job.address_line2}` : ''}
        </p>
        <p className="text-muted">
          {job.city}, {job.state || 'FL'} {job.zip_code}
        </p>
        {job.gate_code && <p>Gate: {job.gate_code}</p>}
        {job.special_instructions && <p className="text-muted">{job.special_instructions}</p>}
        <a href={mapsUrl} target="_blank" rel="noreferrer">
          <Button size="sm" variant="outline" className="mt-2">
            <Navigation size={14} /> Navigate
          </Button>
        </a>
      </Card>

      {job.technician_notes && (
        <Card>
          <h2 className="font-display font-semibold">Existing notes</h2>
          <pre className="mt-2 whitespace-pre-wrap text-sm text-muted">{job.technician_notes}</pre>
        </Card>
      )}

      <Card className="space-y-3">
        <h2 className="font-display font-semibold">Add notes</h2>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
        <Button size="sm" loading={busy === 'notes'} onClick={saveNotes}>
          Save notes
        </Button>
      </Card>

      <Card className="space-y-3">
        <h2 className="font-display font-semibold">Upload photo</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm"
        />
        <Button size="sm" variant="outline" loading={busy === 'photo'} onClick={uploadPhotos}>
          Upload
        </Button>
      </Card>

      {job.status !== 'completed' && (
        <Button className="w-full" loading={busy === 'complete'} onClick={complete}>
          Mark complete
        </Button>
      )}
    </div>
  )
}
