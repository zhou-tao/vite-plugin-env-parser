<script setup lang="ts">
  import v from 'vite-env'

  console.log(v.VITE_KUN_JOBS)
  const env = import.meta.env
  console.log(env)
</script>

<template>
  <h2>user env variables</h2>
  <table>
    <thead>
      <tr>
        <th>NAME</th>
        <th>VALUE</th>
        <th>TYPE</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, name) in env" :key="name">
        <template v-if="(name as string).startsWith('VITE_') || (name as string).startsWith('APP_')">
          <td>{{ name }}</td>
          <td>{{ value }}</td>
          <td class="type">
            {{ Array.isArray(value) ? `${typeof value[0]}[]` : typeof value }}
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  border-spacing: 1px;
  border-collapse: collapse;
}

table th,td {
  padding: 6px 12px;
  border: solid 1px #666;
}

.type {
  color: aqua;
}
</style>
