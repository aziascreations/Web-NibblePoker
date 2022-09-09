<?php
set_include_path('../commons/');
include_once 'config.php';
include_once 'langs.php';
?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'headers.php'; ?>
	<title><?php print(localize('privacy.title')); ?> - Nibble Poker</title>
	<meta name="description" content="<?php print(localize('privacy.description')); ?>">
	<meta property="og:title" content="Nibble Poker - <?php print(localize('privacy.title')); ?>" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="<?php echo($host_uri); ?>/" />
    <meta property="og:image" content="<?php echo($host_uri); ?>/resources/Azias/logos/v2_opengraph.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="<?php print(localize('privacy.description')); ?>"/>
</head>
<body class="with-custom-webkit-scrollbars with-custom-css-scrollbars dark-mode" data-dm-shortcut-enabled="true" data-sidebar-shortcut-enabled="true">
<?php include 'body-root.php'; ?>
<div class="page-wrapper with-sidebar with-navbar-fixed-bottom">
	<?php include 'sidebar.php'; ?>
	<div class="content-wrapper">
		<div class="container-fluid">
			<div id="page-title-bar" class="card p-0 pl-20 m-0 square-corners bg-very-dark title-bkgd navbar">
				<h2 class="content-title font-size-24 mt-20 text-truncate">
					<i class="fad fa-user-secret"></i>&nbsp;&nbsp;<?php print(localize('privacy.title')); ?>
				</h2>
				<?php include 'header-lang.php'; ?>
			</div>
			<div class="content mx-auto w-lg-p90">
				<div class="card p-0 mx-0">
					<div class="px-card py-10 border-bottom px-20">
						<div class="container-fluid">
							<h2 class="card-title font-size-18 m-0">
								<i class="fad fa-info"></i>&nbsp;&nbsp;<?php print(localize('privacy.introduction.title')); ?>
							</h2>
						</div>
					</div>
					<div class="px-card py-10 bg-light-lm px-20 bg-very-dark title-bkgd">
						<p class="font-size-12 m-0 mb-5">
							<?php print(localize('privacy.introduction.text.1')); ?>
						</p>
						<p class="font-size-12 m-0">
							<?php print(localize('privacy.introduction.text.2')); ?><br>
							<i class="fad fa-globe ml-10"></i>
							<a href="https://gdpr.eu/privacy-notice/">
								https://gdpr.eu/
							</a><br>
							<i class="fad fa-globe ml-10"></i>
							<a href="https://eur-lex.europa.eu/legal-content/ALL/?uri=CELEX%3A32016R0679">
								https://eur-lex.europa.eu/
							</a>
						</p>
					</div>
				</div>
				<div class="card p-0 mx-0">
					<div class="px-card py-10 border-bottom px-20">
						<div class="container-fluid">
							<h2 class="card-title font-size-18 m-0">
								<i class="fad fa-database"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.data.title')); ?>
							</h2>
						</div>
					</div>
					<div class="px-card py-10 bg-light-lm px-20 bg-very-dark title-bkgd">
						<p class="font-size-12 m-0">
							<?php print(localize('privacy.v2.data.intro.1')); ?>
							<br>
							<?php print(localize('privacy.v2.data.intro.2')); ?>
						</p>
						<p class="font-size-12 mb-0">
							<?php print(localize('privacy.v2.data.private.1')); ?><br>
							<span class="m-0 ml-10">
								<i class="fad fa-circle font-size-8"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.data.private_list.1')); ?><br>
							</span>
							<span class="m-0 ml-10">
								<i class="fad fa-circle font-size-8"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.data.private_list.2')); ?><br>
							</span>
						</p>
						<p class="font-size-12 mb-0">
							<?php print(localize('privacy.v2.data.non_private.1')); ?><br>
							<span class="m-0 ml-10">
								<i class="fad fa-circle font-size-8"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.data.non_private_list.1')); ?><br>
							</span>
							<span class="m-0 ml-10">
								<i class="fad fa-circle font-size-8"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.data.non_private_list.2')); ?><br>
							</span>
						</p>
						<p class="font-size-12 mb-0">
							<?php print(localize('privacy.v2.data.end.1')); ?>
						</p>
						<p class="font-size-12 mb-0">
							<?php print(localize('privacy.v2.data.end.2')); ?><br>
							<?php print(localize('privacy.v2.data.end.3')); ?>
						</p>
						<p class="font-size-12 mb-0">
							<?php print(localize('privacy.v2.data.end.4')); ?>
						</p>
						<p class="font-size-12 mb-0">
							<?php print(localize('privacy.v2.data.end.5')); ?><br>
							<?php print(localize('privacy.v2.data.end.6')); ?>
						</p>
					</div>
				</div>
				
				<div class="card p-0 mx-0">
					<div class="px-card py-10 border-bottom px-20">
						<div class="container-fluid">
							<h2 class="card-title font-size-18 m-0">
								<i class="fad fa-handshake"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.third.title')); ?>
							</h2>
						</div>
					</div>
					<div class="px-card py-10 bg-light-lm px-20 bg-very-dark title-bkgd">
						<p class="font-size-12 m-0">
							<?php print(localize('privacy.v2.third.intro.1')); ?><br>
							<?php print(localize('privacy.v2.third.intro.2')); ?>
						</p>
						<p class="font-size-12 mb-0">
							<?php print(localize('privacy.v2.third.intro.3')); ?>
						</p>
						<p class="font-size-12 mb-0">
							<?php print(localize('privacy.v2.third.intro.4')); ?><br>
							<i class="fad fa-globe ml-10"></i>
							<a href="https://v6node.com/legal">
                                https://v6node.com/legal
							</a>
							<span class="ml-5">(<?php print(localize('lang.english')); ?> & <?php print(localize('lang.german')); ?>)</span><br>
							<i class="fad fa-globe ml-10"></i>
							<a href="https://v6node.b-cdn.net/legal/dataprotection.pdf">
                                https://v6node.b-cdn.net/legal/dataprotection.pdf
							</a>
							<span class="ml-5">(<?php print(localize('lang.german')); ?>)</span><br>
						</p>
					</div>
				</div>
				
				<div class="card p-0 mx-0">
					<div class="px-card py-10 border-bottom px-20">
						<div class="container-fluid">
							<h2 class="card-title font-size-18 m-0">
								<i class="fad fa-cookie-bite"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.cookies.title')); ?>
							</h2>
						</div>
					</div>
					<div class="px-card py-10 bg-light-lm px-20 bg-very-dark title-bkgd">
						<p class="font-size-12 m-0">
							<?php print(localize('privacy.v2.cookies.intro.1')); ?>
						</p>
					</div>
				</div>
				
				<div class="card p-0 mx-0">
					<div class="px-card py-10 border-bottom px-20">
						<div class="container-fluid">
							<h2 class="card-title font-size-18 m-0">
								<i class="fad fa-sync-alt"></i>&nbsp;&nbsp;<?php print(localize('privacy.update.title')); ?>
							</h2>
						</div>
					</div>
					<div class="px-card py-10 bg-light-lm px-20 bg-very-dark title-bkgd">
						<p class="font-size-12 m-0">
							<?php print(localize('privacy.v2.update.intro.1')); ?>
						</p>
						<p class="font-size-12 mb-0">
							<i class="fad fa-calendar-alt"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.1.date')); ?>
							<span class="m-0 ml-20">
								<i class="fad fa-globe"></i>&nbsp;&nbsp;<a href="/privacy/privacy_2021-12-04_en.txt"><?php print(localize('lang.english')); ?></a>
							</span>
							<span class="m-0 ml-20">
								<i class="fad fa-globe"></i>&nbsp;&nbsp;<a href="/privacy/privacy_2021-12-04_fr.txt"><?php print(localize('lang.french')); ?></a>
							</span>
							<br>
							<span class="m-0 ml-10">
								<i class="fad fa-circle font-size-8"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.1.desc.1')); ?><br>
							</span>
						</p>
                        <p class="font-size-12 mb-0">
                            <i class="fad fa-calendar-alt"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.2.date')); ?>
                            <span class="m-0 ml-20">
								<i class="fad fa-globe"></i>&nbsp;&nbsp;<a href="/privacy/privacy_2022-03-18_en.txt"><?php print(localize('lang.english')); ?></a>
							</span>
                            <span class="m-0 ml-20">
								<i class="fad fa-globe"></i>&nbsp;&nbsp;<a href="/privacy/privacy_2022-03-18_fr.txt"><?php print(localize('lang.french')); ?></a>
							</span>
                            <br>
                            <span class="m-0 ml-10">
								<i class="fad fa-circle font-size-8"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.2.desc.1')); ?><br>
							</span>
                            <span class="m-0 ml-10">
								<i class="fad fa-circle font-size-8"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.2.desc.2')); ?><br>
							</span>
                            <span class="m-0 ml-10">
								<i class="fad fa-circle font-size-8"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.2.desc.3')); ?>
							</span>
                        </p>


                        <p class="font-size-12 mb-0">
                            <i class="fad fa-calendar-alt"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.3.date')); ?>
                            <span class="m-0 ml-20">
								<i class="fad fa-globe"></i>&nbsp;&nbsp;<a href="/privacy/privacy_2022-09-09_en.txt"><?php print(localize('lang.english')); ?></a>
							</span>
                            <span class="m-0 ml-20">
								<i class="fad fa-globe"></i>&nbsp;&nbsp;<a href="/privacy/privacy_2022-09-09_fr.txt"><?php print(localize('lang.french')); ?></a>
							</span>
                            <br>
                            <span class="m-0 ml-10">
								<i class="fad fa-circle font-size-8"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.3.desc.1')); ?><br>
							</span>
                            <span class="m-0 ml-20">
								<i class="fad fa-circle font-size-8"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.3.desc.1.1')); ?><br>
							</span>
                            <span class="m-0 ml-20">
								<i class="fad fa-circle font-size-8"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.3.desc.1.2')); ?><br>
							</span>
                            <span class="m-0 ml-10">
								<i class="fad fa-circle font-size-8"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.3.desc.2')); ?><br>
							</span>
                        </p>
                        
						<p class="font-size-12 mb-0">
							<?php print(localize('privacy.v2.update.end.2')); ?>
						</p>
					</div>
				</div>
				
				<div class="card p-0 mx-0">
					<div class="px-card py-10 border-bottom px-20">
						<div class="container-fluid">
							<h2 class="card-title font-size-18 m-0">
								<i class="fad fa-mailbox"></i>&nbsp;&nbsp;<?php print(localize('privacy.contact.title')); ?>
							</h2>
						</div>
					</div>
					<div class="px-card py-10 bg-light-lm px-20 bg-very-dark title-bkgd">
						<p class="font-size-12 m-0">
							<?php print(localize('privacy.contact.text.1')); ?><br>
							<i class="fad fa-at ml-10"></i>
							<a href="mailto:herwin.bozet@gmail.com">
								herwin.bozet@gmail.com
							</a>
						</p>
					</div>
				</div>
				<div class="card p-0 mx-0">
					<div class="px-card py-10 border-bottom px-20">
						<div class="container-fluid">
							<h2 class="card-title font-size-18 m-0">
								<i class="fad fa-gavel"></i>&nbsp;&nbsp;<?php print(localize('privacy.complaint.title')); ?>
							</h2>
						</div>
					</div>
					<div class="px-card py-10 bg-light-lm px-20 bg-very-dark title-bkgd">
						<p class="font-size-12 m-0 mb-5">
							<?php print(localize('privacy.complaint.text.1')); ?>
						</p>
						<p class="font-size-12 m-0">
							<?php print(localize('privacy.complaint.text.2')); ?><br>
							<i class="fad fa-globe ml-10"></i>
							<a href="https://ec.europa.eu/info/law/law-topic/data-protection/reform/rights-citizens/redress/what-should-i-do-if-i-think-my-personal-data-protection-rights-havent-been-respected_en">
								https://ec.europa.eu/
							</a>
							<span class="ml-5">(<?php print(localize('lang.english')); ?>)</span><br>
							<i class="fad fa-globe ml-10"></i>
							<a href="https://gegevensbeschermingsautoriteit.be/citoyen/agir/introduire-une-plainte">
								https://gegevensbeschermingsautoriteit.be/
							</a>
							<span class="ml-5">(<?php print(localize('lang.french')); ?>)</span><br>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include 'footer.php'; ?>
</div>
<script src="/resources/HalfMoon/1.1.1/js/halfmoon.min.js"></script>
<script src="/resources/Azias/js/nibblepoker.lu.js"></script>
</body>
</html>
