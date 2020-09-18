from trac.web.api import IRequestFilter
from trac.core import *
from trac.web.chrome import add_script

# This can go away once they fix http://genshi.edgewall.org/ticket/136
# At that point we should use Transformer.filter THIS IS STILL SOLVING
# PROBLEMS WELL AFTER THAT TICKET HAS BEEN CLOSED - A new ticket #290
# [1000] has fixed the bug, but is not the trac default yet Without
# this (using the default filter) I was getting omitted closing tags
# for some tags (Based on whitespace afaict)


# Note: Removed ticket filter; moved field disable/remove to ticket.js


class ReportsFilter(Component):
    """This component Removed rows from the report that require the 
       management screen to supply values"""
    implements(IRequestFilter)
    def pre_process_request(self, req, handler):
        return handler

    def post_process_request(self, req, template, data, content_type):
        if template == 'report_list.html':
            add_script(req, "billing/report_filter.js")
        return (template, data, content_type)
