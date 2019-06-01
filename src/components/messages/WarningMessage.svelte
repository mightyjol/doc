<script>
	export let title;
	export let content;
</script>

<style>
	.box{
		position: relative;
		overflow: hidden;

	}

	.border{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 5px;
		background-color: #ffdd57;
	}
</style>

<div class="box">
	<div class="border"></div>
	<div class="media">
		<div class="media-left">
			<div class="icon is-large has-text-warning">
				<i class="fas fa-lg fa-exclamation-triangle"></i>
			</div>
		</div>
		<div class="media-content">
			<div class="content">
				<p>
					<strong>{title}</strong>  
					<br>
					{content}
				</p>
			</div>
		</div>
	</div>
</div>