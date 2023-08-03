import * as VultrNode from '@vultr/vultr-node';
import { env as process_env } from "node:process";

// Initialize the instance with your configuration
export const vultr = VultrNode.initialize({
    apiKey: process_env.VULTR_KEY
});

export const env = {
    tag: process_env.VULTR_TAG,
    region: process_env.VULTR_REGION,
    plan: process_env.VULTR_PLAN,
    firewall_group_id: process_env.VULTR_FIREWELL_GROUP_ID
};