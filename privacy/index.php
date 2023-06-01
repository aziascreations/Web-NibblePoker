<?php
$start_time = microtime(true);
set_include_path('../');
include_once 'commons/config.php';
include_once 'commons/langs.php';
?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'commons/DOM/head.php'; ?>
    <title><?php print(localize('privacy.head.title')); ?></title>
    <meta name="description" content="<?php print(localize('privacy.head.description')); ?>">
    <meta property="og:title" content="<?php print(localize('privacy.og.title')); ?>"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="<?php echo($host_uri . l10n_url_abs('/privacy/')); ?>"/>
    <meta property="og:image" content="<?php echo($host_uri); ?>/resources/NibblePoker/images/logos/v2_opengraph.png"/>
    <meta property="og:image:type" content="image/png"/>
    <meta property="og:description" content="<?php print(localize('privacy.og.description')); ?>"/>
</head>
<body>
<?php
include_once 'commons/DOM/utils.php';
$SIDEBAR_IDS = [];
include 'commons/DOM/sidebar.php';
?>
<header class="w-full p-m pl-s">
    <h1 class="t-size-17 t-w-500">
        <i class="fad fa-user-secret t-size-16 mr-s t-muted"></i><?php print(localize("privacy.header.title")); ?>
    </h1>
	<?php include 'commons/DOM/header-lang.php'; ?>
</header>
<main id="main" class="rl-m border border-r-0 p-l">
	
	<?php printMainHeader(localize("privacy.introduction.title"), "fad fa-info"); ?>
    <p class="mt-xs ml-s"><?php print(localize("privacy.introduction.text.1")); ?></p>
    <p class="mt-s ml-s">
		<?php print(localize("privacy.introduction.text.2")); ?>
        <br><i class="fad fa-globe ml-s t-size-8"></i>
        <a href="https://gdpr.eu/privacy-notice/">
            https://gdpr.eu/
        </a><br>
        <i class="fad fa-globe ml-s t-size-8"></i>
        <a href="https://eur-lex.europa.eu/legal-content/ALL/?uri=CELEX%3A32016R0679">
            https://eur-lex.europa.eu/
        </a>
    </p>
	
	<?php printMainHeader(localize("privacy.v2.data.title"), "fad fa-database"); ?>
    <p class="mt-xs ml-s">
		<?php print(localize('privacy.v2.data.intro.1')); ?>
        <br>
		<?php print(localize('privacy.v2.data.intro.2')); ?>
    </p>
    <p class="mt-s ml-s">
		<?php print(localize('privacy.v2.data.private.1')); ?><br>
        <span class="ml-s">
			<i class="fad fa-circle t-size-6"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.data.private_list.1')); ?>
		</span>
		<br>
        <span class="ml-s">
			<i class="fad fa-circle t-size-6"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.data.private_list.2')); ?>
		</span>
    </p>
    <p class="mt-s ml-s">
		<?php print(localize('privacy.v2.data.non_private.1')); ?><br>
        <span class="ml-s">
			<i class="fad fa-circle t-size-6"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.data.non_private_list.1')); ?>
		</span>
		<br>
        <span class="ml-s">
			<i class="fad fa-circle t-size-6"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.data.non_private_list.2')); ?>
		</span>
    </p>
    <p class="mt-s ml-s">
		<?php print(localize('privacy.v2.data.end.1')); ?>
    </p>
    <p class="mt-s ml-s">
		<?php print(localize('privacy.v2.data.end.2')); ?><br>
		<?php print(localize('privacy.v2.data.end.3')); ?>
    </p>
    <p class="mt-s ml-s">
		<?php print(localize('privacy.v2.data.end.4')); ?>
    </p>
    <p class="mt-s ml-s">
		<?php print(localize('privacy.v2.data.end.5')); ?><br>
		<?php print(localize('privacy.v2.data.end.6')); ?>
    </p>
    
	<?php printMainHeader(localize("privacy.v2.third.title"), "fad fa-handshake"); ?>
	<p class="mt-xs ml-s">
		<?php print(localize('privacy.v2.third.intro.1')); ?><br>
		<?php print(localize('privacy.v2.third.intro.2')); ?>
	</p>
	<p class="mt-s ml-s">
		<?php print(localize('privacy.v2.third.intro.3')); ?>
	</p>
	<p class="mt-s ml-s">
		<?php print(localize('privacy.v2.third.intro.4')); ?><br>
		<i class="fad fa-globe ml-s t-size-8"></i>
		<a href="https://v6node.com/legal">
			https://v6node.com/legal
		</a>
		<span class="ml-s">(<?php print(localize('lang.english')); ?> & <?php print(localize('lang.german')); ?>)</span><br>
		<i class="fad fa-globe ml-s t-size-8"></i>
		<a href="https://v6node.b-cdn.net/legal/dataprotection.pdf">
			https://v6node.b-cdn.net/legal/dataprotection.pdf
		</a>
		<span class="ml-s">(<?php print(localize('lang.german')); ?>)</span><br>
	</p>
	
	<?php printMainHeader(localize("privacy.v2.cookies.title"), "fad fa-cookie-bite"); ?>
    <p class="mt-xs ml-s">
		<?php print(localize('privacy.v2.cookies.intro.1')); ?>
    </p>
    
	<?php printMainHeader(localize("privacy.v2.update.title"), "fad fa-sync-alt"); ?>
    <p class="mt-xs ml-s">
		<?php print(localize('privacy.v2.update.intro.1')); ?>
    </p>
    <p class="mt-s ml-s">
        <i class="fad fa-calendar-alt"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.1.date')); ?>
        <span class="ml-l">
            <i class="fad fa-globe t-size-8"></i>&nbsp;&nbsp;<a href="/privacy/privacy_2021-12-04_en.txt"><?php print(localize('lang.english')); ?></a>
        </span>
        <span class="ml-l">
            <i class="fad fa-globe t-size-8"></i>&nbsp;&nbsp;<a href="/privacy/privacy_2021-12-04_fr.txt"><?php print(localize('lang.french')); ?></a>
        </span>
        <br>
        <span class="ml-s">
            <i class="fad fa-circle t-size-6"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.1.desc.1')); ?><br>
        </span>
    </p>
    <p class="mt-s ml-s">
        <i class="fad fa-calendar-alt"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.2.date')); ?>
        <span class="ml-l">
            <i class="fad fa-globe t-size-8"></i>&nbsp;&nbsp;<a href="/privacy/privacy_2022-03-18_en.txt"><?php print(localize('lang.english')); ?></a>
        </span>
        <span class="ml-l">
            <i class="fad fa-globe t-size-8"></i>&nbsp;&nbsp;<a href="/privacy/privacy_2022-03-18_fr.txt"><?php print(localize('lang.french')); ?></a>
        </span>
        <br>
        <span class="ml-s">
            <i class="fad fa-circle t-size-6"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.2.desc.1')); ?>
        </span>
        <br>
        <span class="ml-s">
            <i class="fad fa-circle t-size-6"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.2.desc.2')); ?>
        </span>
        <br>
        <span class="ml-s">
            <i class="fad fa-circle t-size-6"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.2.desc.3')); ?>
        </span>
    </p>
    <p class="mt-s ml-s">
        <i class="fad fa-calendar-alt"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.3.date')); ?>
        <span class="ml-l">
            <i class="fad fa-globe t-size-8"></i>&nbsp;&nbsp;<a href="/privacy/privacy_2022-09-09_en.txt"><?php print(localize('lang.english')); ?></a>
        </span>
        <span class="ml-l">
            <i class="fad fa-globe t-size-8"></i>&nbsp;&nbsp;<a href="/privacy/privacy_2022-09-09_fr.txt"><?php print(localize('lang.french')); ?></a>
        </span>
        <br>
        <span class="ml-s">
            <i class="fad fa-circle t-size-6"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.3.desc.1')); ?><br>
        </span>
        <span class="ml-l">
            <i class="fad fa-circle t-size-6"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.3.desc.1.1')); ?><br>
        </span>
        <span class="ml-l">
            <i class="fad fa-circle t-size-6"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.3.desc.1.2')); ?><br>
        </span>
        <span class="ml-s">
            <i class="fad fa-circle t-size-6"></i>&nbsp;&nbsp;<?php print(localize('privacy.v2.update.history.3.desc.2')); ?><br>
        </span>
    </p>
    <p class="mt-s ml-s">
		<?php print(localize('privacy.v2.update.end.2')); ?>
    </p>
    
	<?php printMainHeader(localize("privacy.contact.title"), "fad fa-mailbox"); ?>
    <p class="mt-xs ml-s">
		<?php print(localize('privacy.contact.text.1')); ?><br>
        <i class="fad fa-at t-size-8 ml-s"></i>
        <a href="mailto:herwin.bozet@gmail.com">herwin.bozet@gmail.com</a>
    </p>
	
	<?php printMainHeader(localize("privacy.complaint.title"), "fad fa-gavel"); ?>
    <p class="mt-xs ml-s">
		<?php print(localize('privacy.complaint.text.1')); ?>
    </p>
    <p class="mt-s ml-s">
		<?php print(localize('privacy.complaint.text.2')); ?><br>
        <i class="fad fa-globe t-size-8 ml-s"></i>
        <a href="https://ec.europa.eu/info/law/law-topic/data-protection/reform/rights-citizens/redress/what-should-i-do-if-i-think-my-personal-data-protection-rights-havent-been-respected_en">
            https://ec.europa.eu/
        </a>
        <span class="ml-s">(<?php print(localize('lang.english')); ?>)</span><br>
        <i class="fad fa-globe t-size-8 ml-s"></i>
        <a href="https://gegevensbeschermingsautoriteit.be/citoyen/agir/introduire-une-plainte">
            https://gegevensbeschermingsautoriteit.be/
        </a>
        <span class="ml-s">(<?php print(localize('lang.french')); ?>)</span><br>
    </p>
    
</main>
<?php
include 'commons/DOM/footer.php';
include 'commons/DOM/scripts.php';
?>
</body>
</html>
<?php
$end_time = microtime(true);
if ($print_execution_timer) {
	echo("<!-- PHP execution took " . round(($end_time - $start_time) * 1000, 2) . " ms -->");
}
?>