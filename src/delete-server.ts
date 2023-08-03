import { vultr, env } from "./vultr-init";
import * as util from "./util";

import type { create_snapshot } from './types';


export async function delete_server() {

    const list_instances = await util.get_list_instances();
    const list_snapshots = await util.get_list_snapshots();

    const instance = list_instances.instances[0];

    // Create snapshot from current instanse
    const create_snapshot: create_snapshot = await vultr.snapshots.createSnapshot({
        instance_id: instance.id,
        description: env.tag
    });

    // Wait for the snapshot creation to complete
    await util.wait_for_snapshot_complete(create_snapshot.snapshot.id, "snapshot");

    const promises: Array<Promise<any>> = [];

    list_snapshots.snapshots.map((snapshot) => {

        promises.push(
            vultr.snapshots.deleteSnapshot({
                "snapshot-id": snapshot.id
            }).then(
                () => console.log("snapshot", snapshot.id, "deleted.")
            )
        );
    });

    promises.push(
        vultr.instances.deleteInstance({
            "instance-id": instance.id
        }).then(
            () => console.log("instance", instance.id, "deleted.")
        )
    );

    await Promise.all(promises);

    console.log("done.");

};