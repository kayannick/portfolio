import type { CodeSnippet } from '@/types'

export const codeSnippets: readonly CodeSnippet[] = [
  {
    id: 'seat-reservation',
    fileName: 'reservation.py',
    language: 'python',
    code: `# Row lock: no double booking
@transaction.atomic
def reserve_seat(user, trip_id, seat_no):
    seat = (
        Seat.objects
        .select_for_update()
        .get(trip_id=trip_id, number=seat_no)
    )
    if seat.is_taken:
        raise SeatUnavailable(seat_no)
    seat.is_taken = True
    seat.save(update_fields=["is_taken"])
    return Ticket.objects.create(
        user=user, seat=seat
    )`,
  },
  {
    id: 'trips-hook',
    fileName: 'useTrips.ts',
    language: 'typescript',
    code: `export function useTrips(route: Route) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchTrips(route, controller.signal)
      .then(setTrips)
      .catch(ignoreAbort)
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [route])

  return { trips, loading }
}`,
  },
  {
    id: 'access-control',
    fileName: 'permissions.py',
    language: 'python',
    code: `# Least privilege: patient or assigned doctor
class IsPatientOrDoctor(BasePermission):
    def has_object_permission(
        self, request, view, obj
    ):
        user_id = request.user.id
        return user_id in (
            obj.patient_id, obj.doctor_id
        )`,
  },
  {
    id: 'celery-reminder',
    fileName: 'tasks.py',
    language: 'python',
    code: `@shared_task(bind=True, max_retries=3)
def send_reminder(self, appt_id):
    appt = Appointment.objects.get(pk=appt_id)
    try:
        notify(appt.patient, appt.starts_at)
    except NotifyError as e:
        raise self.retry(exc=e, countdown=60)`,
  },
  {
    id: 'appointments-query',
    fileName: 'appointments.sql',
    language: 'sql',
    code: `-- Upcoming appointments per doctor
SELECT d.full_name,
       a.starts_at,
       a.status
FROM appointments AS a
JOIN doctors AS d ON d.id = a.doctor_id
WHERE a.starts_at > NOW()
  AND a.status = 'confirmed'
ORDER BY a.starts_at ASC
LIMIT 20;`,
  },
]