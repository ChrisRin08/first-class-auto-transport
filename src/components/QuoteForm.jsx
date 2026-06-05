import { useMemo, useState } from 'react'
import { services } from '../data/services.js'

const vehicleConditions = [
  'Runs and drives',
  'Does not start',
  'Accident damaged',
  'No keys',
]

const steps = [
  { number: 1, title: 'Location' },
  { number: 2, title: 'Vehicle' },
  { number: 3, title: 'Service' },
  { number: 4, title: 'Contact' },
]

const initialFormData = {
  pickupLocation: '',
  dropoffLocation: '',
  vehicleYear: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleCondition: '',
  serviceType: '',
  preferredDateTime: '',
  notes: '',
  fullName: '',
  phoneNumber: '',
  email: '',
}

function FieldError({ message }) {
  if (!message) {
    return null
  }

  return (
    <p className="mt-2 text-sm text-red-300" role="alert" aria-live="polite">
      {message}
    </p>
  )
}

// This helper allows common phone formats by checking only the digit count.
function hasValidPhoneNumber(value) {
  const digitsOnly = value.replace(/\D/g, '')
  return digitsOnly.length >= 10
}

function StepIndicator({ currentStep }) {
  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((step) => {
        const isActive = step.number === currentStep
        const isComplete = step.number < currentStep

        return (
          <div
            key={step.number}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? 'border-[var(--color-brand-gold)] bg-[var(--color-brand-gold-soft)] text-[var(--color-brand-off-white)]'
                : isComplete
                  ? 'border-[var(--color-brand-gold)]/25 bg-white/6 text-white/80'
                  : 'border-white/10 bg-transparent text-white/55'
            }`}
          >
            Step {step.number}: {step.title}
          </div>
        )
      })}
    </div>
  )
}

function QuoteForm() {
  // Keep all quote fields in one place so each step updates the same draft.
  const [formData, setFormData] = useState(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const serviceOptions = useMemo(() => services.map((service) => service.title), [])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
  }

  // Validate only the active step so people can move through the form gradually.
  function validateStep(stepNumber) {
    const nextErrors = {}

    if (stepNumber === 1) {
      if (!formData.pickupLocation.trim()) {
        nextErrors.pickupLocation = 'Pickup location is required.'
      }

      if (!formData.dropoffLocation.trim()) {
        nextErrors.dropoffLocation = 'Drop-off location is required.'
      }
    }

    if (stepNumber === 2) {
      if (!formData.vehicleYear.trim()) {
        nextErrors.vehicleYear = 'Vehicle year is required.'
      } else if (!/^\d{4}$/.test(formData.vehicleYear.trim())) {
        nextErrors.vehicleYear = 'Enter a 4-digit year.'
      }

      if (!formData.vehicleMake.trim()) {
        nextErrors.vehicleMake = 'Vehicle make is required.'
      }

      if (!formData.vehicleModel.trim()) {
        nextErrors.vehicleModel = 'Vehicle model is required.'
      }

      if (!formData.vehicleCondition) {
        nextErrors.vehicleCondition = 'Select the vehicle condition.'
      }
    }

    if (stepNumber === 3) {
      if (!formData.serviceType) {
        nextErrors.serviceType = 'Select a service type.'
      }

      if (!formData.preferredDateTime) {
        nextErrors.preferredDateTime = 'Preferred date and time is required.'
      }
    }

    if (stepNumber === 4) {
      if (!formData.fullName.trim()) {
        nextErrors.fullName = 'Full name is required.'
      }

      if (!formData.phoneNumber.trim()) {
        nextErrors.phoneNumber = 'Phone number is required.'
      } else if (!hasValidPhoneNumber(formData.phoneNumber.trim())) {
        nextErrors.phoneNumber = 'Please enter a valid phone number.'
      }

      if (!formData.email.trim()) {
        nextErrors.email = 'Email is required.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        nextErrors.email = 'Enter a valid email address.'
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  // Step changes always go through these helpers so validation and state stay predictable.
  function handleNextStep() {
    if (!validateStep(currentStep)) {
      return
    }

    setCurrentStep((step) => Math.min(step + 1, steps.length))
  }

  function handlePreviousStep() {
    setCurrentStep((step) => Math.max(step - 1, 1))
  }

  // This reset path lets someone begin a fresh quote after the temporary success state.
  function handleResetQuote() {
    setFormData(initialFormData)
    setErrors({})
    setCurrentStep(1)
    setIsSubmitted(false)
  }

  // Final submit is intentionally local-only until the next phase connects real delivery.
  function handleSubmit(event) {
    event.preventDefault()

    if (!validateStep(currentStep)) {
      return
    }

    setIsSubmitted(true)
  }

  return (
    <div className="rounded-[2rem] border border-[var(--color-brand-gold)]/22 bg-[linear-gradient(180deg,rgba(10,10,10,0.94),rgba(10,10,10,0.84))] p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-brand-gold)]">
          Quote Request
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-brand-off-white)] sm:text-4xl">
          Request towing or transport pricing in a few quick steps
        </h2>
        <p className="mt-5 text-base leading-7 text-white/72 sm:text-lg">
          Tell us where the vehicle is, what service you need, and how to reach
          you. This form is prepared for submission, but it does not send data
          anywhere yet.
        </p>
      </div>

      <div className="mt-8">
        <StepIndicator currentStep={currentStep} />
      </div>

      {isSubmitted ? (
        <div
          className="mt-8 rounded-[1.5rem] border border-[var(--color-brand-gold)]/28 bg-[var(--color-brand-gold-soft)] p-6"
          role="status"
          aria-live="polite"
        >
          {/* This status region is announced politely because it replaces the form after submit. */}
          <h3 className="text-xl font-semibold text-[var(--color-brand-off-white)]">
            Quote request ready
          </h3>
          <p className="mt-3 text-base leading-7 text-white/80">
            Quote request ready. Form submission will be connected in the next
            phase.
          </p>
          <button
            type="button"
            onClick={handleResetQuote}
            className="mt-6 inline-flex items-center justify-center rounded-full border border-[var(--color-brand-black)]/15 bg-[var(--color-brand-black)] px-6 py-3 text-sm font-semibold text-[var(--color-brand-off-white)] transition hover:bg-[var(--color-brand-black)]/90"
          >
            Start another quote
          </button>
        </div>
      ) : (
        <form className="mt-8" onSubmit={handleSubmit} noValidate>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5 sm:p-6">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-brand-gold)]">
                Step {currentStep} of {steps.length}
              </p>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-brand-off-white)]">
                {steps[currentStep - 1].title}
              </p>
            </div>

            {currentStep === 1 ? (
              <div className="grid gap-5">
                <label className="block">
                  <span className="text-sm font-medium text-[var(--color-brand-off-white)]">
                    Pickup location
                  </span>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-white/12 bg-[var(--color-brand-black)]/78 px-4 py-3 text-[var(--color-brand-off-white)] outline-none transition focus:border-[var(--color-brand-gold)]"
                    placeholder="Enter pickup address or city"
                  />
                  <FieldError message={errors.pickupLocation} />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-[var(--color-brand-off-white)]">
                    Drop-off location
                  </span>
                  <input
                    type="text"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-white/12 bg-[var(--color-brand-black)]/78 px-4 py-3 text-[var(--color-brand-off-white)] outline-none transition focus:border-[var(--color-brand-gold)]"
                    placeholder="Enter drop-off address or city"
                  />
                  <FieldError message={errors.dropoffLocation} />
                </label>
              </div>
            ) : null}

            {currentStep === 2 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-[var(--color-brand-off-white)]">
                    Vehicle year
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-white/12 bg-[var(--color-brand-black)]/78 px-4 py-3 text-[var(--color-brand-off-white)] outline-none transition focus:border-[var(--color-brand-gold)]"
                    placeholder="2020"
                  />
                  <FieldError message={errors.vehicleYear} />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-[var(--color-brand-off-white)]">
                    Vehicle make
                  </span>
                  <input
                    type="text"
                    name="vehicleMake"
                    value={formData.vehicleMake}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-white/12 bg-[var(--color-brand-black)]/78 px-4 py-3 text-[var(--color-brand-off-white)] outline-none transition focus:border-[var(--color-brand-gold)]"
                    placeholder="Toyota"
                  />
                  <FieldError message={errors.vehicleMake} />
                </label>

                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-[var(--color-brand-off-white)]">
                    Vehicle model
                  </span>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-white/12 bg-[var(--color-brand-black)]/78 px-4 py-3 text-[var(--color-brand-off-white)] outline-none transition focus:border-[var(--color-brand-gold)]"
                    placeholder="Camry"
                  />
                  <FieldError message={errors.vehicleModel} />
                </label>

                <fieldset className="sm:col-span-2">
                  <legend className="text-sm font-medium text-[var(--color-brand-off-white)]">
                    Vehicle condition
                  </legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {vehicleConditions.map((condition) => (
                      <label
                        key={condition}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white/80"
                      >
                        <input
                          type="radio"
                          name="vehicleCondition"
                          value={condition}
                          checked={formData.vehicleCondition === condition}
                          onChange={handleChange}
                          className="h-4 w-4 accent-[var(--color-brand-gold)]"
                        />
                        <span>{condition}</span>
                      </label>
                    ))}
                  </div>
                  <FieldError message={errors.vehicleCondition} />
                </fieldset>
              </div>
            ) : null}

            {currentStep === 3 ? (
              <div className="grid gap-5">
                <label className="block">
                  <span className="text-sm font-medium text-[var(--color-brand-off-white)]">
                    Service type
                  </span>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-white/12 bg-[var(--color-brand-black)]/78 px-4 py-3 text-[var(--color-brand-off-white)] outline-none transition focus:border-[var(--color-brand-gold)]"
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((serviceOption) => (
                      <option key={serviceOption} value={serviceOption}>
                        {serviceOption}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.serviceType} />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-[var(--color-brand-off-white)]">
                    Preferred date/time
                  </span>
                  <input
                    type="datetime-local"
                    name="preferredDateTime"
                    value={formData.preferredDateTime}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-white/12 bg-[var(--color-brand-black)]/78 px-4 py-3 text-[var(--color-brand-off-white)] outline-none transition focus:border-[var(--color-brand-gold)]"
                  />
                  <FieldError message={errors.preferredDateTime} />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-[var(--color-brand-off-white)]">
                    Notes
                  </span>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    className="mt-2 w-full rounded-2xl border border-white/12 bg-[var(--color-brand-black)]/78 px-4 py-3 text-[var(--color-brand-off-white)] outline-none transition focus:border-[var(--color-brand-gold)]"
                    placeholder="Add any helpful details about access, timing, or vehicle condition."
                  />
                </label>
              </div>
            ) : null}

            {currentStep === 4 ? (
              <div className="grid gap-5">
                <label className="block">
                  <span className="text-sm font-medium text-[var(--color-brand-off-white)]">
                    Full name
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-white/12 bg-[var(--color-brand-black)]/78 px-4 py-3 text-[var(--color-brand-off-white)] outline-none transition focus:border-[var(--color-brand-gold)]"
                    placeholder="Your full name"
                  />
                  <FieldError message={errors.fullName} />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-[var(--color-brand-off-white)]">
                    Phone number
                  </span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-white/12 bg-[var(--color-brand-black)]/78 px-4 py-3 text-[var(--color-brand-off-white)] outline-none transition focus:border-[var(--color-brand-gold)]"
                    placeholder="(555) 123-4567"
                  />
                  <FieldError message={errors.phoneNumber} />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-[var(--color-brand-off-white)]">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-white/12 bg-[var(--color-brand-black)]/78 px-4 py-3 text-[var(--color-brand-off-white)] outline-none transition focus:border-[var(--color-brand-gold)]"
                    placeholder="you@example.com"
                  />
                  <FieldError message={errors.email} />
                </label>
              </div>
            ) : null}
          </div>

          <p className="mt-5 text-sm text-white/60">
            Your information is only used to contact you about your quote
            request.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/4 px-6 py-3 text-sm font-semibold text-[var(--color-brand-off-white)] transition hover:border-[var(--color-brand-gold)]/40 hover:bg-white/7 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-brand-black)] transition hover:brightness-105"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-brand-black)] transition hover:brightness-105"
              >
                Submit Quote Request
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  )
}

export default QuoteForm
