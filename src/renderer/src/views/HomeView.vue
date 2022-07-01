<template>
	<main>
		<p class="font-header">Taco</p>
		<logo />
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Logo from '../components/icons/Logo.vue';

export default defineComponent({
	components: { Logo },
});
</script>
