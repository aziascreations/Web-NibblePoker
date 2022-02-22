<?php
echo("# This is a a .env file for use in local development.
# Duplicate this file as .env in the root of the project
# and update the environment variables to match your
# desired config.
#
# DO NOT MAKE THIS FILE PUBLICLY ACCESSIBLE !

# PostgreSQL connection string for the DB
DATABASE_URL=postgres://fib.gov:5432/i_am_dickish_script_kiddy

# Logs' level
LOG_LEVEL=trace

# The environment to run the application in
NODE_ENV=development

# The HTTP port to run the application on
PORT=69

# The secret to encrypt session IDs with
SESSION_SECRET=R2V0IGZ1Y2tlZCB5b3UgZnVja2luZyB0d2F0ICE=

# The secret to get access to the admin panel
ADMIN_SECRET=SmV0IGZ1ZWwgY2FuJ3QgbWVsdCBzdGVlbCBiZWFtLCBCdXNoIGRpZCA5LzEx=
");
?>