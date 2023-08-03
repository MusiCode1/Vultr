import { vultr, env } from "./vultr-init";
import * as util from "./util";

import type { create_instance } from './types';


export async function start_server() {

    const {
        region, plan, tag,
        firewall_group_id
    } = env;

    const list_snapshots = await util.get_list_snapshots();

    const snapshot_id = list_snapshots.snapshots[0].id;

    const crt_ins: create_instance = await vultr.instances.createInstance({
        region,
        plan,
        snapshot_id,
        enable_ipv6: true,
        tags: [tag],
        firewall_group_id
    });

    console.log(crt_ins);

    await util.wait_for_snapshot_complete(crt_ins.instance.id, "instance");

};