<template>
	<li>
		{{ title }}
	</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: ['title'],
});
</script>
