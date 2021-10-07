<template>
  <div class="container max-w-screen-md mx-auto p-2">
    <h2 class="text-lg font-bold mb-3">
      A first class clinical company looking for staff for their plastic surgery
      clinic in Saudi Arabia
    </h2>

    <table class="requirements-table">
      <tbody>
        <tr>
          <th>Position</th>
          <td>Staff Nurses</td>
        </tr>
        <tr>
          <th>No of Vacancy</th>
          <td>15</td>
        </tr>
        <tr>
          <th>Experience</th>
          <td>
            minimum 2 years experience in any recognized Hospital / Clinic
          </td>
        </tr>
        <tr>
          <th>Education</th>
          <td>
            BSc / Diploma in nursing with good academic background / Score
          </td>
        </tr>
        <tr>
          <th>Language</th>
          <td>Expert in English ( Arabic literacy is an advantage)</td>
        </tr>
        <tr>
          <th>Registration</th>
          <td>
            Registered ( Update) by Bangladesh Nursing and Midwifery Council
          </td>
        </tr>
        <tr>
          <th>Verification</th>
          <td>
            Academic Certificate, Work Experience and BD Nursing Council update
            Registration will be verified by employer / Dataflow Company
          </td>
        </tr>
      </tbody>
    </table>
    <ul class="mt-2 offer-list">
      <li>Valid Passport</li>
      <li>
        The salary will be 75,000 tk to 100,000tk (3500 SR to 4500SR) + other
        facilities
      </li>
      <li>Free Accommodation and Transport</li>
      <li>Free ticket for round trip</li>
      <li>Vacation pay</li>
      <li>42 days leave for every 2 years</li>
      <li>Service benefits (Pension skim)</li>
      <li>Health/Medical Insurance</li>
      <li>
        International standard Employment (You can move Europe> USA, Australia,
        Canada, UK after 02 years successfully employment)
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss">
.requirements-table {
  @apply table-auto w-full border border-green-600;

  th,
  td {
    @apply border border-green-600 p-2;
  }
  th {
    @apply font-medium text-left sm:w-32;
  }
}
.offer-list {
  @apply list-disc list-inside;
  li {
    @apply list-item;
  }
}
</style>
