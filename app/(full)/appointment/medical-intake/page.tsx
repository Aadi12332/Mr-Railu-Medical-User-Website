"use client";

import { Fragment, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// PHQ-9 questions
const PHQ_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way",
];

const phqSchema = z.object(
  Object.fromEntries(
    PHQ_QUESTIONS.map((_, index) => [
      String(index + 1),
      z
        .number({ required_error: "Please select one option" })
        .int()
        .min(0)
        .max(3),
    ]),
  ) as Record<string, z.ZodNumber>,
);

const intakeFormSchema = z.object({
  // basic info
  firstName: z.string().min(1, { message: "First name is required" }),
  middleInitial: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  sex: z.string().min(1, { message: "Please select your sex" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  primaryPhone: z.string().optional(),
  mobilePhone: z.string().optional(),
  workPhone: z.string().optional(),
  email: z
    .string()
    .email({ message: "Enter a valid email address" })
    .optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  maritalStatus: z.string().optional(),
  drivingLicense: z.string().optional(),

  // emergency contact
  emergency: z.object({
    relationship: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    primaryPhone: z.string().optional(),
    mobilePhone: z.string().optional(),
    workPhone: z.string().optional(),
    email: z.string().optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
  }),

  // medical questions
  medicalHistory: z.array(z.string()).optional(),
  currentMedications: z.array(z.string()).optional(),
  medicationAllergies: z.array(z.string()).optional(),
  preferredPharmacies: z.array(z.string()).optional(),
  pharmacyName: z.string().optional(),
  pharmacyAddress: z.string().optional(),
  heardFrom: z.string().optional(),

  // phq
  phq: phqSchema,
  difficulty: z.string().optional(),
});

type IntakeFormValues = z.infer<typeof intakeFormSchema>;

export default function MedicalIntakePage() {
  const router = useRouter();
  const form = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: {
      sex: "",
      phq: {},
    },
    // validate on submit, re-validate on change and focus the first error
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  // dynamic lists
  const [newMedicalHistory, setNewMedicalHistory] = useState("");
  const [newMed, setNewMed] = useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [newPharmacy, setNewPharmacy] = useState("");

  function addToArray(
    field:
      | "medicalHistory"
      | "currentMedications"
      | "medicationAllergies"
      | "preferredPharmacies",
    value: string,
  ) {
    if (!value) return;
    const current = form.getValues(field) || [];
    form.setValue(field, [...current, value], {
      shouldValidate: true,
      shouldTouch: true,
    });
  }

  function onSubmit(data: IntakeFormValues) {
    console.log("intake form data", data);
    // navigate to success confirmation screen
    router.push("/appointment/medical-intake/success");
  }

  return (
    <div className="relative max-w-6xl mx-auto p-5 pt-16 py-8 space-y-4 bg-[#E6E8EE]">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute h-10 w-10 top-3 rounded-full bg-[#eef7f6] text-primary hover:bg-[#e0f0ef]"
        onClick={() => router.back()}
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log("validation errors", errors);
        })}
        className="space-y-4"
      >
        {/* summary */}
        {Object.keys(form.formState.errors).length > 0 && (
          <div className="mb-4 text-destructive">
            Please correct the errors below before submitting.
          </div>
        )}
        {/* basic information */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-primary">
              Basic Information
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input {...form.register("firstName")} />
                <FieldError errors={[form.formState.errors.firstName]} />
              </Field>
              <Field>
                <FieldLabel>Middle Initial</FieldLabel>
                <Input {...form.register("middleInitial")} />
                <FieldError errors={[form.formState.errors.middleInitial]} />
              </Field>
              <Field>
                <FieldLabel>Last Name</FieldLabel>
                <Input {...form.register("lastName")} />
                <FieldError errors={[form.formState.errors.lastName]} />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field>
                <FieldLabel htmlFor="sex">Sex</FieldLabel>
                <Controller
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="sex">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[form.formState.errors.sex]} />
              </Field>
              <Field>
                <FieldLabel>DOB</FieldLabel>
                <Input type="date" {...form.register("dob")} />
                <FieldError errors={[form.formState.errors.dob]} />
              </Field>
              <Field>
                <FieldLabel>Marital Status</FieldLabel>
                <Input {...form.register("maritalStatus")} />
                <FieldError errors={[form.formState.errors.maritalStatus]} />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Primary Phone Number</FieldLabel>
                <Input {...form.register("primaryPhone")} />
                <FieldError errors={[form.formState.errors.primaryPhone]} />
              </Field>
              <Field>
                <FieldLabel>Mobile Number</FieldLabel>
                <Input {...form.register("mobilePhone")} />
                <FieldError errors={[form.formState.errors.mobilePhone]} />
              </Field>
              <Field>
                <FieldLabel>Work Phone Number</FieldLabel>
                <Input {...form.register("workPhone")} />
                <FieldError errors={[form.formState.errors.workPhone]} />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" {...form.register("email")} />
                <FieldError errors={[form.formState.errors.email]} />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Address</FieldLabel>
                <Input {...form.register("address1")} />
                <FieldError errors={[form.formState.errors.address1]} />
              </Field>
              <Field>
                <FieldLabel>Address 2</FieldLabel>
                <Input {...form.register("address2")} />
                <FieldError errors={[form.formState.errors.address2]} />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field>
                <FieldLabel>City</FieldLabel>
                <Input {...form.register("city")} />
                <FieldError errors={[form.formState.errors.city]} />
              </Field>
              <Field>
                <FieldLabel>State</FieldLabel>
                <Input {...form.register("state")} />
                <FieldError errors={[form.formState.errors.state]} />
              </Field>
              <Field>
                <FieldLabel>Zip</FieldLabel>
                <Input {...form.register("zip")} />
                <FieldError errors={[form.formState.errors.zip]} />
              </Field>
            </div>

            <Field>
              <FieldLabel>State Driving License / State Id</FieldLabel>
              <div className="flex gap-4 items-center">
                <Input
                  className="flex-1"
                  {...form.register("drivingLicense")}
                />
                <Button variant="outline" size="sm">
                  Upload Here
                </Button>
              </div>
              <FieldError errors={[form.formState.errors.drivingLicense]} />
            </Field>
          </CardContent>
        </Card>

        {/* emergency contact */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-primary">
              Emergency Contact
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Relationship To Contact</FieldLabel>
                <Input {...form.register("emergency.relationship")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency
                      ?.relationship as unknown as { message?: string },
                  ]}
                />
              </Field>
              <Field>
                <FieldLabel>First Name</FieldLabel>
                <Input {...form.register("emergency.firstName")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency?.firstName as unknown as {
                      message?: string;
                    },
                  ]}
                />
              </Field>
              <Field>
                <FieldLabel>Middle Name</FieldLabel>
                <Input {...form.register("emergency.middleName")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency?.middleName as unknown as {
                      message?: string;
                    },
                  ]}
                />
              </Field>
              <Field>
                <FieldLabel>Last Name</FieldLabel>
                <Input {...form.register("emergency.lastName")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency?.lastName as unknown as {
                      message?: string;
                    },
                  ]}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Primary Phone Number</FieldLabel>
                <Input {...form.register("emergency.primaryPhone")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency
                      ?.primaryPhone as unknown as { message?: string },
                  ]}
                />
              </Field>
              <Field>
                <FieldLabel>Mobile Number</FieldLabel>
                <Input {...form.register("emergency.mobilePhone")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency?.mobilePhone as unknown as {
                      message?: string;
                    },
                  ]}
                />
              </Field>
              <Field>
                <FieldLabel>Work Phone Number</FieldLabel>
                <Input {...form.register("emergency.workPhone")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency?.workPhone as unknown as {
                      message?: string;
                    },
                  ]}
                />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" {...form.register("emergency.email")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency?.email as unknown as {
                      message?: string;
                    },
                  ]}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Address Line 1</FieldLabel>
                <Input {...form.register("emergency.address1")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency?.address1 as unknown as {
                      message?: string;
                    },
                  ]}
                />
              </Field>
              <Field>
                <FieldLabel>Address Line 2</FieldLabel>
                <Input {...form.register("emergency.address2")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency?.address2 as unknown as {
                      message?: string;
                    },
                  ]}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field>
                <FieldLabel>City</FieldLabel>
                <Input {...form.register("emergency.city")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency?.city as unknown as {
                      message?: string;
                    },
                  ]}
                />
              </Field>
              <Field>
                <FieldLabel>State</FieldLabel>
                <Input {...form.register("emergency.state")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency?.state as unknown as {
                      message?: string;
                    },
                  ]}
                />
              </Field>
              <Field>
                <FieldLabel>Zip</FieldLabel>
                <Input {...form.register("emergency.zip")} />
                <FieldError
                  errors={[
                    form.formState.errors.emergency?.zip as unknown as {
                      message?: string;
                    },
                  ]}
                />
              </Field>
            </div>
          </CardContent>
        </Card>

        {/* medical questions */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-primary">
              Medical Question
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* dynamic fields */}
              <Field>
                <FieldLabel>List Your Past Medical History</FieldLabel>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newMedicalHistory}
                    onChange={(e) => setNewMedicalHistory(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      addToArray("medicalHistory", newMedicalHistory);
                      setNewMedicalHistory("");
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-2 space-y-1 text-sm text-slate-600">
                  {(form.getValues("medicalHistory") || []).map((item, i) => (
                    <div key={i}>{item}</div>
                  ))}
                </div>
              </Field>

              <Field>
                <FieldLabel>Current Medications</FieldLabel>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newMed}
                    onChange={(e) => setNewMed(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      addToArray("currentMedications", newMed);
                      setNewMed("");
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-2 space-y-1 text-sm text-slate-600">
                  {(form.getValues("currentMedications") || []).map(
                    (item, i) => (
                      <div key={i}>{item}</div>
                    ),
                  )}
                </div>
              </Field>

              <Field>
                <FieldLabel>Medications Allergy</FieldLabel>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      addToArray("medicationAllergies", newAllergy);
                      setNewAllergy("");
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-2 space-y-1 text-sm text-slate-600">
                  {(form.getValues("medicationAllergies") || []).map(
                    (item, i) => (
                      <div key={i}>{item}</div>
                    ),
                  )}
                </div>
              </Field>

              <Field>
                <FieldLabel>Your Preferred Pharmacies</FieldLabel>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newPharmacy}
                    onChange={(e) => setNewPharmacy(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      addToArray("preferredPharmacies", newPharmacy);
                      setNewPharmacy("");
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-2 space-y-1 text-sm text-slate-600">
                  {(form.getValues("preferredPharmacies") || []).map(
                    (item, i) => (
                      <div key={i}>{item}</div>
                    ),
                  )}
                </div>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Pharmacy Name</FieldLabel>
                  <Input {...form.register("pharmacyName")} />
                  <FieldError errors={[form.formState.errors.pharmacyName]} />
                </Field>
                <Field>
                  <FieldLabel>Pharmacy Address</FieldLabel>
                  <Input {...form.register("pharmacyAddress")} />
                  <FieldError
                    errors={[form.formState.errors.pharmacyAddress]}
                  />
                </Field>

                <Field>
                  <FieldLabel>How Did You Hear About Us?</FieldLabel>
                  <Input {...form.register("heardFrom")} />
                  <FieldError errors={[form.formState.errors.heardFrom]} />
                </Field>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PHQ-9 */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-primary">
              Patient Health Questionnaire-9
            </h2>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-sm border border-slate-200">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2" colSpan={3}>
                      Over the last 2 weeks, how often have you been bothered by
                      any of the following problems? (Use &quot;√&quot; to
                      indicate your answer)
                    </th>
                    {[
                      "Not At All",
                      "Several Days",
                      "More Than Half The Days",
                      "Nearly Every Day",
                    ].map((h) => (
                      <th key={h} className="p-2 text-center">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PHQ_QUESTIONS.map((q, index) => {
                    const key = `phq.${index + 1}` as const;
                    const phqError = (
                      form.formState.errors.phq as
                        | Record<string, { message?: string } | undefined>
                        | undefined
                    )?.[String(index + 1)];
                    return (
                      <Fragment key={index}>
                        <tr className="border-t border-slate-200 py-2">
                          <td className="p-2 py-3 text-sm" colSpan={3}>
                            {index + 1}. {q}
                          </td>
                          {[0, 1, 2, 3].map((val) => (
                            <td key={val} className="p-2 py-3 text-center">
                              <Controller
                                control={form.control}
                                name={key}
                                render={({ field }) => (
                                  <input
                                    type="radio"
                                    value={val}
                                    checked={Number(field.value) === val}
                                    onChange={() => field.onChange(val)}
                                  />
                                )}
                              />
                            </td>
                          ))}
                        </tr>
                        {phqError?.message && (
                          <tr
                            className="border-t border-slate-100"
                            key={`err-${index}`}
                          >
                            <td
                              className="px-2 pb-2 text-destructive text-xs"
                              colSpan={7}
                            >
                              Question {index + 1}: {phqError.message}
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-200">
              <div className="p-2">
                If you checked off any problems, how difficult have these
                problems made it for you to do your work, take care of things at
                home, or get along with other people?
                <div className="mt-2 flex flex-wrap gap-4">
                  {[
                    "Not Difficult At All",
                    "Somewhat Difficult",
                    "Very Difficult",
                    "Extremely Difficult",
                  ].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <Controller
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                          <div className="flex flex-col items-center bg-[#F4F9F8B2] rounded p-4 gap-1">
                            <span className="text-sm">{opt}</span>
                            <input
                              type="radio"
                              value={opt}
                              checked={field.value === opt}
                              onChange={() => field.onChange(opt)}
                            />
                          </div>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                size="lg"
                className="bg-gradient-dash h-10 px-8"
                type="submit"
              >
                Submit Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
